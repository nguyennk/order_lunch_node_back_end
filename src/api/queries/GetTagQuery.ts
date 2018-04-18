import { GraphQLFieldConfig, GraphQLList } from 'graphql';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { AbstractGraphQLQuery, GraphQLContext, Query } from '../../lib/graphql';
import { Tag } from '../models/Tag';
import { TagService } from '../services/TagService';
import { TagType } from '../types/TagType';

@Query()
export class GetTagsQuery extends AbstractGraphQLQuery<GraphQLContext<any, any>, Tag[], any> implements GraphQLFieldConfig {
    public type = new GraphQLList(TagType);
    public allow = [];
    public args = {};

    constructor(
        private tagService: TagService,
        @Logger(__filename) private log: LoggerInterface
    ) {
        super();
    }

    public async run(root: any, args: any, context: GraphQLContext<any, any>): Promise<Tag[]> {
        const tags = await this.tagService.find();
        this.log.info(`Found ${tags.length} tags`);
        return tags;
    }

}
