import { GraphQLFieldConfig, GraphQLList } from 'graphql';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { AbstractGraphQLQuery, GraphQLContext, Query } from '../../lib/graphql';
import { Order } from '../models/Order';
import { OrderService } from '../services/OrderService';
import { OrderType } from '../types/OrderType';

@Query()
export class GetOrdersQuery extends AbstractGraphQLQuery<GraphQLContext<any, any>, Order[], any> implements GraphQLFieldConfig {
    public type = new GraphQLList(OrderType);
    public allow = [];
    public args = {};

    constructor(
        private orderService: OrderService,
        @Logger(__filename) private log: LoggerInterface
    ) {
        super();
    }

    public async run(root: any, args: any, context: GraphQLContext<any, any>): Promise<Order[]> {
        const orders = await this.orderService.find();
        this.log.info(`Found ${orders.length} orders`);
        return orders;
    }

}
