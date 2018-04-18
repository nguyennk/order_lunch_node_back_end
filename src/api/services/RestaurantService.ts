import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Restaurant } from '../models/Restaurant';
import { RestaurantRepository } from '../repositories/RestaurantRepository';
import { events } from '../subscribers/events';
import { Dish } from '../models/Dish';

@Service()
export class RestaurantService {

    constructor(
        @OrmRepository() private restaurantRepository: RestaurantRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Restaurant[]> {
        this.log.info('Find all restaurantes');
        return this.restaurantRepository.find();
    }

    public findByDish(dish: Dish): Promise<Restaurant> {
        this.log.info('Find the restaurant of the dish', dish.toString());
        return this.restaurantRepository.findOne({
            where: {
                id: dish.restaurant_id,
            },
        });
    }

    public findOne(id: number): Promise<Restaurant | undefined> {
        this.log.info('Find a restaurant');
        return this.restaurantRepository.findOne({
            where: {
                id
            },
            relations: ['dishes', 'dishes.tag']
        });
    }

    public async create(restaurant: Restaurant): Promise<Restaurant> {
        this.log.info('Create a new restaurant => ', restaurant.toString());
        const newRestaurant = await this.restaurantRepository.save(restaurant);
        this.eventDispatcher.dispatch(events.restaurant.created, newRestaurant);
        return newRestaurant;
    }

    public update(id: number, restaurant: Restaurant): Promise<Restaurant> {
        this.log.info('Update a restaurant');
        restaurant.id = id;
        return this.restaurantRepository.save(restaurant);
    }

    public delete(id: number): Promise<void> {
        this.log.info('Delete a restaurant');
        return this.restaurantRepository.removeById(id);
    }

}
