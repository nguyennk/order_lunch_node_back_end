import { GraphQLFieldConfig, GraphQLList } from 'graphql';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { AbstractGraphQLQuery, GraphQLContext, Query } from '../../lib/graphql';
import { Feedback } from '../models/Feedback';
import { FeedbackService } from '../services/FeedbackService';
import { FeedbackType } from '../types/FeedbackType';

@Query()
export class GetFeedbacksQuery extends AbstractGraphQLQuery<GraphQLContext<any, any>, Feedback[], any> implements GraphQLFieldConfig {
    public type = new GraphQLList(FeedbackType);
    public allow = [];
    public args = {};

    constructor(
        private feedbackService: FeedbackService,
        @Logger(__filename) private log: LoggerInterface
    ) {
        super();
    }

    public async run(root: any, args: any, context: GraphQLContext<any, any>): Promise<Feedback[]> {
        const feedbacks = await this.feedbackService.find();
        this.log.info(`Found ${feedbacks.length} feedbacks`);
        return feedbacks;
    }

}
