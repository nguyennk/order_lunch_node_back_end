import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { RestaurantNotFoundError } from '../errors/RestaurantNotFoundError';
import { Restaurant } from '../models/Restaurant';
import { RestaurantService } from '../services/RestaurantService';

@Authorized()
@JsonController('/restaurants')
export class RestaurantController {

    constructor(
        private restaurantService: RestaurantService
    ) { }

    @Get()
    public find(): Promise<Restaurant[]> {
        return this.restaurantService.find();
    }

    @Get('/:id')
    @OnUndefined(RestaurantNotFoundError)
    public one(@Param('id') id: number): Promise<Restaurant | undefined> {
        return this.restaurantService.findOne(id);
    }

    @Post()
    public create(@Body() restaurant: Restaurant): Promise<Restaurant> {
        return this.restaurantService.create(restaurant);
    }

    @Put('/:id')
    public update(@Param('id') id: number, @Body() restaurant: Restaurant): Promise<Restaurant> {
        return this.restaurantService.update(id, restaurant);
    }

    @Delete('/:id')
    public delete(@Param('id') id: number): Promise<void> {
        return this.restaurantService.delete(id);
    }

}
