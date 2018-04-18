import { GraphQLFieldConfig, GraphQLList } from 'graphql';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { AbstractGraphQLQuery, GraphQLContext, Query } from '../../lib/graphql';
import { Dish } from '../models/Dish';
import { DishService } from '../services/DishService';
import { DishType } from '../types/DishType';

@Query()
export class GetDishsQuery extends AbstractGraphQLQuery<GraphQLContext<any, any>, Dish[], any> implements GraphQLFieldConfig {
    public type = new GraphQLList(DishType);
    public allow = [];
    public args = {};

    constructor(
        private dishService: DishService,
        @Logger(__filename) private log: LoggerInterface
    ) {
        super();
    }

    public async run(root: any, args: any, context: GraphQLContext<any, any>): Promise<Dish[]> {
        const dishes = await this.dishService.find();
        this.log.info(`Found ${dishes.length} dishes`);
        return dishes;
    }

}
