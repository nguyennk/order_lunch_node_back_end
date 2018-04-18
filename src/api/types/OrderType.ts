import {
    GraphQLFieldConfigMap, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString
} from 'graphql';

import { GraphQLContext } from '../../lib/graphql';
import { OrderDishOfOrderType } from './OrderDishType';
import { Order } from '../models/Order';

const OrderFields: GraphQLFieldConfigMap = {
    id: {
        type: GraphQLID,
        description: 'The ID',
    },
    state: {
        type: GraphQLString,
        description: 'The state of the order.',
    },
};

export const OrderType = new GraphQLObjectType({
    name: 'Order',
    description: 'A single order.',
    fields: () => ({
        ...OrderFields, ...{
            orderDishes: {
                type: new GraphQLList(OrderDishOfOrderType),
                description: 'the dishes ordered',
                resolve: async (order: Order, args: any, context: GraphQLContext<any, any>) =>
                    context.dataLoaders.orderDishesByOrderIds.load(order.id),
            }
        }
    }),
});
