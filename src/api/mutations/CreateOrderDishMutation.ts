import { plainToClass } from 'class-transformer';
import { GraphQLFieldConfig, GraphQLInt, GraphQLNonNull } from 'graphql';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { GraphQLContext, Mutation } from '../../lib/graphql';
import { AbstractGraphQLMutation } from '../../lib/graphql/AbstractGraphQLMutation';
import { OrderDish } from '../models/OrderDish';
import { OrderDishService } from '../services/OrderDishService';
import { OrderDishType } from '../types/OrderDishType';

interface CreateOrderDishMutationArguments {
    name: string;
    age: number;
}

@Mutation()
export class CreateOrderDishMutation extends AbstractGraphQLMutation<GraphQLContext<any, any>, OrderDish, CreateOrderDishMutationArguments> implements GraphQLFieldConfig {
    public type = OrderDishType;
    public args = {
        order_id: { type: new GraphQLNonNull(GraphQLInt) },
        dish_id: { type: new GraphQLNonNull(GraphQLInt) },
        user_id: { type: new GraphQLNonNull(GraphQLInt) },
    };

    constructor(
        private petService: OrderDishService,
        @Logger(__filename) private log: LoggerInterface
    ) {
        super();
    }

    public async run(root: any, args: CreateOrderDishMutationArguments, context: GraphQLContext<any, any>): Promise<OrderDish> {
        const pet = await this.petService.create(plainToClass(OrderDish, args));
        this.log.info('Successfully created a new order dish');
        return pet;
    }
}
