import {
    GraphQLFieldConfigMap, GraphQLID, GraphQLObjectType, GraphQLString
} from 'graphql';

import { GraphQLContext } from '../../lib/graphql';
import { Tag } from '../models/Tag';
import { DishType } from './DishType';

const TagFields: GraphQLFieldConfigMap = {
    id: {
        type: GraphQLID,
        description: 'The ID',
    },
    tag: {
        type: GraphQLString,
        description: 'The name of the tag.',
    },
};

export const TagOfDishType = new GraphQLObjectType({
    name: 'TagOfDish',
    description: 'A dish tags',
    fields: () => ({ ...TagFields, ...{} }),
});

export const TagType = new GraphQLObjectType({
    name: 'Tag',
    description: 'A single tag.',
    fields: () => ({
        ...TagFields, ...{
            dishes: {
                type: DishType,
                description: 'All the dishes with the tag',
                resolve: (tag: Tag, args: any, context: GraphQLContext<any, any>) =>
                    context.dataLoaders.dishesByTagIds.load(tag.id),
            },
        }
    }),
});
