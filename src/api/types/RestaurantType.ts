import {
    GraphQLFieldConfigMap, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString
} from 'graphql';

import { GraphQLContext } from '../../lib/graphql';
import { Restaurant } from '../models/Restaurant';
import { CategoryType } from './CategoryType';
import { ImageType } from './ImageType';
import { DishOfRestaurantType } from './DishType';

const RestaurantFields: GraphQLFieldConfigMap = {
    id: {
        type: GraphQLID,
        description: 'The ID',
    },
    name: {
        type: GraphQLString,
        description: 'The name of the restaurant.',
    },
    location: {
        type: GraphQLString,
        description: 'The location of the restaurant.',
    },
    phone_number: {
        type: GraphQLString,
        description: 'The phone number of the restaurant.',
    },
};

export const RestaurantType = new GraphQLObjectType({
    name: 'Restaurant',
    description: 'A single restaurant.',
    fields: () => ({
        ...RestaurantFields, ...{
            category: {
                type: CategoryType,
                description: 'The category of the restaurant',
                resolve: (restaurant: Restaurant, args: any, context: GraphQLContext<any, any>) =>
                    context.dataLoaders.category.load(restaurant.category_id),
            },
            image: {
                type: ImageType,
                description: 'The image of the restaurant',
                resolve: (restaurant: Restaurant, args: any, context: GraphQLContext<any, any>) =>
                    context.dataLoaders.image.load(restaurant.image_id),
            },
            dishes: {
                type: new GraphQLList(DishOfRestaurantType),
                description: 'The dishes of the restaurant',
                resolve: (restaurant: Restaurant, args: any, context: GraphQLContext<any, any>) =>
                    context.dataLoaders.dishesByRestaurantIds.load(restaurant.id),
            }
        }
    }),
});
