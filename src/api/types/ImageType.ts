import {
    GraphQLFieldConfigMap, GraphQLID, GraphQLObjectType, GraphQLString
} from 'graphql';

const ImageFields: GraphQLFieldConfigMap = {
    id: {
        type: GraphQLID,
        description: 'The ID',
    },
    type: {
        type: GraphQLString,
        description: 'The type of the image.',
    },
    source: {
        type: GraphQLString,
        description: 'The source of the image.',
    },
    data: {
        type: GraphQLString,
        description: 'The data of the image.',
    },
};

export const ImageOfDishType = new GraphQLObjectType({
    name: 'ImageOfDish',
    description: 'A dish images',
    fields: () => ({ ...ImageFields, ...{} }),
});

export const ImageOfRestaurantType = new GraphQLObjectType({
    name: 'ImageOfRestaurant',
    description: 'A restaurant images',
    fields: () => ({ ...ImageFields, ...{} }),
});

export const ImageType = new GraphQLObjectType({
    name: 'Image',
    description: 'A single image.',
    fields: () => ({
        ...ImageFields
    }),
});
