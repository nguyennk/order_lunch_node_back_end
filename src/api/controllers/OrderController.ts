import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { OrderNotFoundError } from '../errors/OrderNotFoundError';
import { Order } from '../models/Order';
import { OrderService } from '../services/OrderService';

@Authorized()
@JsonController('/orders')
export class OrderController {

    constructor(
        private orderService: OrderService
    ) { }

    @Get()
    public find(): Promise<Order[]> {
        return this.orderService.find();
    }

    @Get('/:id')
    @OnUndefined(OrderNotFoundError)
    public one(@Param('id') id: number): Promise<Order | undefined> {
        return this.orderService.findOne(id);
    }

    @Post()
    public create(@Body() order: Order): Promise<Order> {
        return this.orderService.create(order);
    }

    @Put('/:id')
    public update(@Param('id') id: number, @Body() order: Order): Promise<Order> {
        return this.orderService.update(id, order);
    }

    @Delete('/:id')
    public delete(@Param('id') id: number): Promise<void> {
        return this.orderService.delete(id);
    }

}
