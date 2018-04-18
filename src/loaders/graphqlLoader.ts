import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { UserRepository } from '../api/repositories/UserRepository';
import { env } from '../env';
import { createDataLoader, createGraphQLServer } from '../lib/graphql';
import { Dish } from '../api/models/Dish';
import { Feedback } from '../api/models/Feedback';
import { OrderDish } from '../api/models/OrderDish';
import { Restaurant } from '../api/models/Restaurant';
import { CategoryRepository } from '../api/repositories/CategoryRepository';
import { TagRepository } from '../api/repositories/TagRepository';
import { DishRepository } from '../api/repositories/DishRepository';
import { FeedbackRepository } from '../api/repositories/FeedbackRepository';
import { ImageRepository } from '../api/repositories/ImageRepository';
import { OrderDishRepository } from '../api/repositories/OrderDishRepository';
import { OrderRepository } from '../api/repositories/OrderRepository';
import { RestaurantRepository } from '../api/repositories/RestaurantRepository';
import { IntegrationRepository } from '../api/repositories/IntegrationRepository';

export const graphqlLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings && env.graphql.enabled) {
        const expressApp = settings.getData('express_app');

        createGraphQLServer(expressApp, {
            route: env.graphql.route,
            editorEnabled: env.graphql.editor,
            queries: env.app.dirs.queries,
            mutations: env.app.dirs.mutations,
            dataLoaders: {
                user: createDataLoader(UserRepository),
                category: createDataLoader(CategoryRepository),
                tag: createDataLoader(TagRepository),
                dish: createDataLoader(Dish),
                dishesByRestaurantIds: createDataLoader(DishRepository, {
                    method: 'findByRestaurantIds',
                    key: 'restaurant_id',
                    multiple: true,
                }),
                dishesByTagIds: createDataLoader(DishRepository, {
                    method: 'findByTagIds',
                    key: 'tag_id',
                    multiple: true,
                }),
                feedback: createDataLoader(Feedback),
                feedbacksByUserIds: createDataLoader(FeedbackRepository, {
                    method: 'findByUserIds',
                    key: 'user_id',
                    multiple: true,
                }),
                integration: createDataLoader(IntegrationRepository),
                image: createDataLoader(ImageRepository),
                orderDish: createDataLoader(OrderDish),
                orderDishesByUserIds: createDataLoader(OrderDishRepository, {
                    method: 'findByUserIds',
                    key: 'user_id',
                    multiple: true,
                }),
                orderDishesByOrderIds: createDataLoader(OrderDishRepository, {
                    method: 'findByOrderIds',
                    key: 'order_id',
                    multiple: true,
                }),
                order: createDataLoader(OrderRepository),
                restaurant: createDataLoader(Restaurant),
                restaurantsByCategoryIds: createDataLoader(RestaurantRepository, {
                    method: 'findByCategoryIds',
                    key: 'category_id',
                    multiple: true,
                }),
            },
        });
    }
};
