import {
    GraphQLFieldConfigMap, GraphQLID, GraphQLObjectType, GraphQLString
} from 'graphql';

import { GraphQLContext } from '../../lib/graphql';
import { Dish } from '../models/Dish';
import { RestaurantType } from './RestaurantType';
import { ImageType } from './ImageType';

const DishFields: GraphQLFieldConfigMap = {
    id: {
        type: GraphQLID,
        description: 'The ID',
    },
    name: {
        type: GraphQLString,
        description: 'The name of the dish.',
    },
};

export const DishOfRestaurantType = new GraphQLObjectType({
    name: 'DishOfRestaurant',
    description: 'A restaurants dishes',
    fields: () => ({ ...DishFields, ...{} }),
});

export const DishType = new GraphQLObjectType({
    name: 'Dish',
    description: 'A single dish.',
    fields: () => ({
        ...DishFields, ...{
            restaurant: {
                type: RestaurantType,
                description: 'The restaurant of the dish',
                resolve: (dish: Dish, args: any, context: GraphQLContext<any, any>) =>
                    context.dataLoaders.restaurant.load(dish.restaurant_id),
            },
            image: {
                type: ImageType,
                description: 'The image of the dish',
                resolve: (dish: Dish, args: any, context: GraphQLContext<any, any>) =>
                    context.dataLoaders.image.load(dish.image_id),
            },
        }
    }),
});
