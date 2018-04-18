import { EntityRepository, Repository } from 'typeorm';

import { Category } from '../models/Category';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category>  {
    public checkAndCreate(category: Category): Promise<Category> {
        return this.createQueryBuilder()
            .select()
            .where(`categories.category = "${category.category}"`)
            .getOne().then(result => {
                if (result) {
                    return result;
                }
                return this.save(category);
            });
    }
}
