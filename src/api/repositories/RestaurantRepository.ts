import { EntityRepository, Repository } from 'typeorm';

import { Restaurant } from '../models/Restaurant';

@EntityRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant>  {
    public findByCategoryIds(ids: number[]): Promise<Restaurant[]> {
        return this.createQueryBuilder()
            .select()
            .where(`restaurants.category_id IN (${ids.map(id => `'${id}'`).join(', ')})`)
            .getMany();
    }

    public checkAndCreate(restaurant: Restaurant): Promise<Restaurant> {
        return this.createQueryBuilder()
            .select()
            .where(`restaurants.name = "${restaurant.name}" AND restaurants.category_id = ${restaurant.category_id}`)
            .getOne().then(result => {
                if (result) {
                    return result;
                }
                return this.save(restaurant);
            });
    }
}
