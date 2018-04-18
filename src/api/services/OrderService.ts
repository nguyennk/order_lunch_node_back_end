import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Order } from '../models/Order';
import { OrderRepository } from '../repositories/OrderRepository';
import { events } from '../subscribers/events';
import { OrderDish } from '../models/OrderDish';

@Service()
export class OrderService {

    constructor(
        @OrmRepository() private orderRepository: OrderRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Order[]> {
        this.log.info('Find all orders');
        return this.orderRepository.find();
    }

    public findByOrderDish(orderDish: OrderDish): Promise<Order> {
        this.log.info('Find the order of the Dish', orderDish.toString());
        return this.orderRepository.findOne({
            where: {
                id: orderDish.order_id,
            },
        });
    }

    public findOne(id: number): Promise<Order | undefined> {
        this.log.info('Find an order');
        return this.orderRepository.findOne({ id });
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
