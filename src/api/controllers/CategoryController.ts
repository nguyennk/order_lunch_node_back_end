import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { CategoryNotFoundError } from '../errors/CategoryNotFoundError';
import { Category } from '../models/Category';
import { CategoryService } from '../services/CategoryService';

@Authorized()
@JsonController('/categories')
export class CategoryController {

    constructor(
        private categoryService: CategoryService
    ) { }

    @Get()
    public find(): Promise<Category[]> {
        return this.categoryService.find();
    }

    @Get('/:id')
    @OnUndefined(CategoryNotFoundError)
    public one(@Param('id') id: number): Promise<Category | undefined> {
        return this.categoryService.findOne(id);
    }

    @Post()
    public create(@Body() category: Category): Promise<Category> {
        return this.categoryService.create(category);
    }

    @Put('/:id')
    public update(@Param('id') id: number, @Body() category: Category): Promise<Category> {
        return this.categoryService.update(id, category);
    }

    @Delete('/:id')
    public delete(@Param('id') id: number): Promise<void> {
        return this.categoryService.delete(id);
    }

}
