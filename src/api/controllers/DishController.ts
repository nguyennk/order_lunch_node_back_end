import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { DishNotFoundError } from '../errors/DishNotFoundError';
import { Dish } from '../models/Dish';
import { DishService } from '../services/DishService';

@Authorized()
@JsonController('/dishs')
export class DishController {

    constructor(
        private dishService: DishService
    ) { }

    @Get()
    public find(): Promise<Dish[]> {
        return this.dishService.find();
    }

    @Get('/:id')
    @OnUndefined(DishNotFoundError)
    public one(@Param('id') id: number): Promise<Dish | undefined> {
        return this.dishService.findOne(id);
    }

    @Post()
    public create(@Body() dish: Dish): Promise<Dish> {
        return this.dishService.create(dish);
    }

    @Put('/:id')
    public update(@Param('id') id: number, @Body() dish: Dish): Promise<Dish> {
        return this.dishService.update(id, dish);
    }

    @Delete('/:id')
    public delete(@Param('id') id: number): Promise<void> {
        return this.dishService.delete(id);
    }

}
