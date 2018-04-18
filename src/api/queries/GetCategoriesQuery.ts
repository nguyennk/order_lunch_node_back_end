import { GraphQLFieldConfig, GraphQLList } from 'graphql';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { AbstractGraphQLQuery, GraphQLContext, Query } from '../../lib/graphql';
import { Category } from '../models/Category';
import { CategoryService } from '../services/CategoryService';
import { CategoryType } from '../types/CategoryType';

@Query()
export class GetCategorysQuery extends AbstractGraphQLQuery<GraphQLContext<any, any>, Category[], any> implements GraphQLFieldConfig {
    public type = new GraphQLList(CategoryType);
    public allow = [];
    public args = {};

    constructor(
        private categoryService: CategoryService,
        @Logger(__filename) private log: LoggerInterface
    ) {
        super();
    }

    public async run(root: any, args: any, context: GraphQLContext<any, any>): Promise<Category[]> {
        const categories = await this.categoryService.find();
        this.log.info(`Found ${categories.length} categories`);
        return categories;
    }

}
