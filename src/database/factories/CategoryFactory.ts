import * as Faker from 'faker';

import { Category } from '../../../src/api/models/Category';
import { define } from '../../lib/seed';

define(Category, (faker: typeof Faker) => {
    const name = faker.name.firstName(1);

    const category = new Category();
    category.category = name;
    return category;
});
