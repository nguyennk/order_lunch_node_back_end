import {
    GraphQLFieldConfigMap, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString
} from 'graphql';

import { GraphQLContext } from '../../lib/graphql';
import { User } from '../models/User';
import { FeedbackOfUserType } from './FeedbackType';
import { OrderDishOfUserType } from './OrderDishType';

const UserFields: GraphQLFieldConfigMap = {
    id: {
        type: GraphQLID,
        description: 'The ID',
    },
    firstName: {
        type: GraphQLString,
        description: 'The first name of the user.',
    },
    lastName: {
        type: GraphQLString,
        description: 'The last name of the user.',
    },
    email: {
        type: GraphQLString,
        description: 'The email of this user.',
    },
};

export const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'A single user.',
    fields: () => ({
        ...UserFields,
        ...{
            feedbacks: {
                type: new GraphQLList(FeedbackOfUserType),
                description: 'The feedbacks of a user',
                resolve: async (user: User, args: any, context: GraphQLContext<any, any>) =>
                    // We use data-loaders to save db queries
                    context.dataLoaders.feedbacksByUserIds.load(user.id),
            },
            orderDishes: {
                type: new GraphQLList(OrderDishOfUserType),
                description: 'the dishes ordered by the user',
                resolve: async (user: User, args: any, context: GraphQLContext<any, any>) =>
                    context.dataLoaders.orderDishesByUserIds.load(user.id),
            }
        }
    }),
});

export const OwnerType = new GraphQLObjectType({
    name: 'Owner',
    description: 'The owner',
    fields: () => ({ ...UserFields, ...{} }),
});
