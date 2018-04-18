import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Dish } from '../models/Dish';
import { DishRepository } from '../repositories/DishRepository';
import { events } from '../subscribers/events';
import { Restaurant } from '../models/Restaurant';

@Service()
export class DishService {

    constructor(
        @OrmRepository() private dishRepository: DishRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Dish[]> {
        this.log.info('Find all dishes');
        return this.dishRepository.find();
    }

    public findByRestaurant(restaurant: Restaurant): Promise<Dish[]> {
        this.log.info('Find all dishes of the restaurant', restaurant.toString());
        return this.dishRepository.find({
            where: {
                restaurant_id: restaurant.id,
            }
        });
    }

    public findOne(id: number): Promise<Dish | undefined> {
        this.log.info('Find a dish');
        return this.dishRepository.findOne({ id });
    }

    public async create(dish: Dish): Promise<Dish> {
        this.log.info('Create a new dish => ', dish.toString());
        const newDish = await this.dishRepository.save(dish);
        this.eventDispatcher.dispatch(events.dish.created, newDish);
        return newDish;
    }

    public update(id: number, dish: Dish): Promise<Dish> {
        this.log.info('Update a dish');
        dish.id = id;
        return this.dishRepository.save(dish);
    }

    public delete(id: number): Promise<void> {
        this.log.info('Delete a dish');
        return this.dishRepository.removeById(id);
    }

}
