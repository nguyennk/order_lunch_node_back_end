import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { OrderDish } from '../models/OrderDish';
import { OrderDishRepository } from '../repositories/OrderDishRepository';
import { events } from '../subscribers/events';
import { Order } from '../models/Order';
import { User } from '../models/User';

@Service()
export class OrderDishService {

    constructor(
        @OrmRepository() private orderDishRepository: OrderDishRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<OrderDish[]> {
        this.log.info('Find all orderDishs');
        return this.orderDishRepository.find();
    }

    public findByOrder(order: Order): Promise<OrderDish[]> {
        this.log.info('Find all the dishes of the Order', order.toString());
        return this.orderDishRepository.find({
            where: {
                order_id: order.id,
            },
        });
    }

    public findByUser(user: User): Promise<OrderDish[]> {
        this.log.info('Find all the dishes of the User', user.toString());
        return this.orderDishRepository.find({
            where: {
                user_id: user.id,
            },
        });
    }

    public findOne(order_id: number, dish_id: number, user_id?: number): Promise<OrderDish | undefined> {
        this.log.info('Find an orderDish');
        return this.orderDishRepository.findOne({ order_id, dish_id, user_id });
    }

    public async create(orderDish: OrderDish): Promise<OrderDish> {
        this.log.info('Create a new orderDish => ', orderDish.toString());
        const newOrderDish = await this.orderDishRepository.save(orderDish);
        this.eventDispatcher.dispatch(events.orderDish.created, newOrderDish);
        return newOrderDish;
    }

    public async delete(order_id: number, dish_id: number): Promise<void | OrderDish> {
        this.log.info('Delete an orderDish');
        const toRemove = await this.findOne(order_id, dish_id);
        return this.orderDishRepository.remove(toRemove);
    }

}
