import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { getConnection } from 'typeorm';

import {
    EventDispatcher,
    EventDispatcherInterface,
} from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Order } from '../models/Order';
import { OrderRepository } from '../repositories/OrderRepository';
import { events } from '../subscribers/events';
import { OrderDish } from '../models/OrderDish';
import { RawOrder } from '../models/RawOrder';
import { User } from '../models/User';
import { OrderDishRepository } from '../repositories/OrderDishRepository';

@Service()
export class OrderService {
    private ORDER_STATUS = ['PENDING', 'ORDERING', 'DONE'];
    constructor(
        @OrmRepository() private orderRepository: OrderRepository,
        @OrmRepository() private orderDishesRepository: OrderDishRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public find(): Promise<Order[]> {
        this.log.info('Find all orders');
        return this.orderRepository.find();
    }

    public async findDateOrder(user: User, date: Date): Promise<Order> {
        this.log.info('Find user today order for user =>', user);
        const order = await this.orderRepository.findOne({
            where: {
                created_date: date,
            },
        });
        order.orderDishes = await this.orderDishesRepository.find({
            where: {
                order_id: order.id,
                user_id: user.id,
            },
            relations: ['dish'],
        });
        return order;
    }

    public findByOrderDish(orderDish: OrderDish): Promise<Order> {
        this.log.info('Find the order of the Dish', orderDish.toString());
        return this.orderRepository.findOne({
            where: {
                id: orderDish.order_id,
            },
        });
    }

    public findOne(date: Date): Promise<Order | undefined> {
        this.log.info('Find an order');
        return this.orderRepository.findOne({
            where: {
                created_date: date.toDateString(),
            },
        });
    }

    public async processRawOrder(
        rawOrder: RawOrder,
        order: Order
    ): Promise<void> {
        const queryRunner = getConnection().createQueryRunner();
        try {
            const orderDishes = order.orderDishes;
            queryRunner.startTransaction();
            if (orderDishes && orderDishes.length) {
                await queryRunner.manager.remove(orderDishes);
            }
            if (rawOrder.dishes && rawOrder.dishes.length) {
                const newOrderDishes = rawOrder.dishes.map(dish => {
                    const tempDish = new OrderDish();
                    tempDish.count = dish.count;
                    tempDish.dish = dish.dish;
                    tempDish.order_id = order.id;
                    tempDish.user_id = rawOrder.user.id;
                    tempDish.price = dish.dish.price;
                    return tempDish;
                });
                await queryRunner.manager.save(newOrderDishes);
            }
            queryRunner.commitTransaction();
        } catch (err) {
            this.log.error(err);
            queryRunner.rollbackTransaction();
        }
    }

    public async saveRawOrder(rawOrder: RawOrder): Promise<Order> {
        this.log.info('Process a raw order =>', rawOrder);
        const user = rawOrder.user;
        let order = new Order();
        if (rawOrder.order_id) {
            /**
             * if order id found
             * retrieve the user current order dishes
             * remove the current backup list
             * replace with new submited list
             * return the order with dishes of the user
             */
            order = await this.orderRepository.findOne({
                where: {
                    id: rawOrder.order_id,
                },
            });
            order.orderDishes = await this.orderDishesRepository.find({
                where: {
                    order_id: order.id,
                    user_id: user.id,
                },
                relations: ['dish'],
            });
        } else {
            /**
             * if order id not found
             * create a new order for today
             * iterate through dishes and create order dish for current user
             * return the order with dishes of the user
             */
            const tempOrder = await getConnection().manager.findOne(Order, {
                where: {
                    created_date: new Date(),
                },
            });
            if (!tempOrder) {
                order.state = this.ORDER_STATUS[0];
                order = await getConnection().manager.save(order);
            } else {
                order = tempOrder;
                order.orderDishes = await this.orderDishesRepository.find({
                    where: {
                        order_id: order.id,
                        user_id: user.id,
                    },
                    relations: ['dish'],
                });
            }
        }
        this.processRawOrder(rawOrder, order);
        return order;
    }

    public async create(order: Order): Promise<Order> {
        this.log.info('Create a new order => ', order.toString());
        const newOrder = await this.orderRepository.save(order);
        this.eventDispatcher.dispatch(events.order.created, newOrder);
        return newOrder;
    }

    public update(id: number, order: Order): Promise<Order> {
        this.log.info('Update an order');
        order.id = id;
        return this.orderRepository.save(order);
    }

    public delete(id: number): Promise<void> {
        this.log.info('Delete an order');
        return this.orderRepository.removeById(id);
    }
}
