import { GraphQLFieldConfig, GraphQLList } from 'graphql';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { AbstractGraphQLQuery, GraphQLContext, Query } from '../../lib/graphql';
import { Restaurant } from '../models/Restaurant';
import { RestaurantService } from '../services/RestaurantService';
import { RestaurantType } from '../types/RestaurantType';

@Query()
export class GetRestaurantsQuery extends AbstractGraphQLQuery<GraphQLContext<any, any>, Restaurant[], any> implements GraphQLFieldConfig {
    public type = new GraphQLList(RestaurantType);
    public allow = [];
    public args = {};

    constructor(
        private restaurantService: RestaurantService,
        @Logger(__filename) private log: LoggerInterface
    ) {
        super();
    }

    public async run(root: any, args: any, context: GraphQLContext<any, any>): Promise<Restaurant[]> {
        const restaurants = await this.restaurantService.find();
        this.log.info(`Found ${restaurants.length} restaurants`);
        return restaurants;
    }

}
