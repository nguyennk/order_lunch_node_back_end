import { Connection } from 'typeorm';

import { Category } from '../../../src/api/models/Category';
import { Restaurant } from '../../../src/api/models/Restaurant';
import { Factory, Seed, times } from '../../lib/seed';

export class CreateCategories implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        await times(10, async (n) => {
            const category = await factory(Category)().seed();
            const restaurant = await factory(Restaurant)().make();
            restaurant.category = category;
            return await em.save(restaurant);
        });
    }

}
