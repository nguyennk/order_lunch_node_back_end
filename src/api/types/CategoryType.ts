import {
    GraphQLFieldConfigMap, GraphQLID, GraphQLObjectType, GraphQLString
} from 'graphql';

import { GraphQLContext } from '../../lib/graphql';
import { Category } from '../models/Category';
import { RestaurantType } from './RestaurantType';

const CategoryFields: GraphQLFieldConfigMap = {
    id: {
        type: GraphQLID,
        description: 'The ID',
    },
    category: {
        type: GraphQLString,
        description: 'The name of the category.',
    },
};

export const CategoryOfRestaurantType = new GraphQLObjectType({
    name: 'CategoryOfRestaurant',
    description: 'A restaurants categories',
    fields: () => ({ ...CategoryFields, ...{} }),
});

export const CategoryType = new GraphQLObjectType({
    name: 'Category',
    description: 'A single category.',
    fields: () => ({
        ...CategoryFields, ...{
            restaurants: {
                type: RestaurantType,
                description: 'All the restaurants with the category',
                resolve: (category: Category, args: any, context: GraphQLContext<any, any>) =>
                    context.dataLoaders.restaurantsByCategoryIds.load(category.id),
            },
        }
    }),
});
