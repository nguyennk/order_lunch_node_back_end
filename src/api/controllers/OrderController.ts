import {
    Authorized,
    Body,
    Delete,
    Get,
    JsonController,
    OnUndefined,
    Param,
    Post,
    Put,
    CurrentUser,
    QueryParam,
} from 'routing-controllers';

import { OrderNotFoundError } from '../errors/OrderNotFoundError';
import { Order } from '../models/Order';
import { OrderService } from '../services/OrderService';
import { RawOrder } from '../models/RawOrder';
import { User } from '../models/User';

@Authorized()
@JsonController('/orders')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get()
    public find(
        @CurrentUser() user?: User,
        @QueryParam('date') date?: string
    ): Promise<Order> {
        return this.orderService.findDateOrder(
            user,
            date ? new Date(date) : new Date()
        );
    }

    @Get('/:timestamp')
    @OnUndefined(OrderNotFoundError)
    public one(
        @Param('timestamp') timestamp: number
    ): Promise<Order | undefined> {
        const date = new Date(timestamp * 1000);
        return this.orderService.findOne(date);
    }

    @Post()
    public submitOrder(
        @Body() order: RawOrder,
        @CurrentUser() user?: User
    ): Promise<Order> {
        order.user = user;
        return this.orderService.saveRawOrder(order);
    }

    @Put('/:id')
    public update(
        @Param('id') id: number,
        @Body() order: Order
    ): Promise<Order> {
        return this.orderService.update(id, order);
    }

    @Delete('/:id')
    public delete(@Param('id') id: number): Promise<void> {
        return this.orderService.delete(id);
    }
}
