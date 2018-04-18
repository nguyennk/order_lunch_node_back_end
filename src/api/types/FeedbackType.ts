import {
    GraphQLFieldConfigMap, GraphQLID, GraphQLObjectType, GraphQLString
} from 'graphql';

import { GraphQLContext } from '../../lib/graphql';
import { Feedback } from '../models/Feedback';
import { OwnerType } from './UserType';

const FeedbackFields: GraphQLFieldConfigMap = {
    id: {
        type: GraphQLID,
        description: 'The ID',
    },
    title: {
        type: GraphQLString,
        description: 'The title of the feedback.',
    },
    content: {
        type: GraphQLString,
        description: 'The content of the feedback.',
    },
};

export const FeedbackOfUserType = new GraphQLObjectType({
    name: 'FeedbackOfUser',
    description: 'A users feedbacks',
    fields: () => ({ ...FeedbackFields, ...{} }),
});

export const FeedbackType = new GraphQLObjectType({
    name: 'Feedback',
    description: 'A single feedback.',
    fields: () => ({
        ...FeedbackFields, ...{
            owner: {
                type: OwnerType,
                description: 'The owner of the feedback',
                resolve: (feedback: Feedback, args: any, context: GraphQLContext<any, any>) =>
                    context.dataLoaders.user.load(feedback.user_id),
            },
        }
    }),
});
