import * as Faker from 'faker';

import { Restaurant } from '../../../src/api/models/Restaurant';
import { define } from '../../lib/seed';

define(Restaurant, (faker: typeof Faker, settings: { role: string }) => {
    const rnumber = faker.random.number(1);
    const name = faker.name.firstName(rnumber);
    const location = faker.address.streetAddress(true);
    const phoneNo = faker.phone.phoneNumber();

    const restaurant = new Restaurant();
    restaurant.name = name;
    restaurant.location = location;
    restaurant.phone_number = phoneNo;
    return restaurant;
});
