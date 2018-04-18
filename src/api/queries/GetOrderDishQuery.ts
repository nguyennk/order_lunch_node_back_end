import { GraphQLFieldConfig, GraphQLList } from 'graphql';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { AbstractGraphQLQuery, GraphQLContext, Query } from '../../lib/graphql';
import { OrderDish } from '../models/OrderDish';
import { OrderDishService } from '../services/OrderDishService';
import { OrderDishType } from '../types/OrderDishType';

@Query()
export class GetOrderDishsQuery extends AbstractGraphQLQuery<GraphQLContext<any, any>, OrderDish[], any> implements GraphQLFieldConfig {
    public type = new GraphQLList(OrderDishType);
    public allow = [];
    public args = {};

    constructor(
        private orderDishService: OrderDishService,
        @Logger(__filename) private log: LoggerInterface
    ) {
        super();
    }

    public async run(root: any, args: any, context: GraphQLContext<any, any>): Promise<OrderDish[]> {
        const orderDishes = await this.orderDishService.find();
        this.log.info(`Found ${orderDishes.length} orderDishes`);
        return orderDishes;
    }

}
