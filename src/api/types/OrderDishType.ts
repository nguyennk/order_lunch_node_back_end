import {
    GraphQLFieldConfigMap, GraphQLInt, GraphQLObjectType
} from 'graphql';

import { GraphQLContext } from '../../lib/graphql';
import { OrderDish } from '../models/OrderDish';
import { OwnerType } from './UserType';
import { OrderType } from './OrderType';
import { DishType } from './DishType';

const OrderDishFields: GraphQLFieldConfigMap = {
    order_id: {
        type: GraphQLInt,
        description: 'The order ID',
    },
    dish_id: {
        type: GraphQLInt,
        description: 'The dish ID',
    },
    user_id: {
        type: GraphQLInt,
        description: 'The user ID',
    },
};

export const OrderDishOfUserType = new GraphQLObjectType({
    name: 'OrderDishOfUser',
    description: 'A users order dishes',
    fields: () => ({ ...OrderDishFields, ...{} }),
});

export const OrderDishOfOrderType = new GraphQLObjectType({
    name: 'OrderDishOfOrder',
    description: 'An order dishes',
    fields: () => ({ ...OrderDishFields, ...{} }),
});

export const OrderDishType = new GraphQLObjectType({
    name: 'OrderDish',
    description: 'A single order dish.',
    fields: () => ({
        ...OrderDishFields, ...{
            owner: {
                type: OwnerType,
                description: 'The owner of the order',
                resolve: (orderDish: OrderDish, args: any, context: GraphQLContext<any, any>) =>
                    context.dataLoaders.user.load(orderDish.user_id),
            },
            dish: {
                type: DishType,
                description: 'The dish of the order',
                resolve: (orderDish: OrderDish, args: any, context: GraphQLContext<any, any>) =>
                    context.dataLoaders.dish.load(orderDish.dish_id),
            },
            order: {
                type: OrderType,
                description: 'The parents order',
                resolve: (orderDish: OrderDish, args: any, context: GraphQLContext<any, any>) =>
                    context.dataLoaders.order.load(orderDish.order_id),
            },
        }
    }),
});
