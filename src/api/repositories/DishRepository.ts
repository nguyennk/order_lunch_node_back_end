import { EntityRepository, Repository } from 'typeorm';

import { Dish } from '../models/Dish';

@EntityRepository(Dish)
export class DishRepository extends Repository<Dish>  {
    public findByRestaurantIds(ids: number[]): Promise<Dish[]> {
        return this.createQueryBuilder()
            .select()
            .where(`dishes.restaurant_id IN (${ids.map(id => `'${id}'`).join(', ')})`)
            .getMany();
    }

    public findByTagIds(ids: number[]): Promise<Dish[]> {
        return this.createQueryBuilder()
            .select()
            .where(`tags.tag_id IN (${ids.map(id => `'${id}'`).join(', ')})`)
            .getMany();
    }
}
