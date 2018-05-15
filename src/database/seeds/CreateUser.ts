import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../../src/api/models/User';
import { Factory, Seed } from '../../lib/seed/types';

export class CreateUser implements Seed {
    public async seed(factory: Factory, connection: Connection): Promise<User> {
        const em = connection.createEntityManager();

        const user = new User();
        user.firstName = 'Nguyen';
        user.lastName = 'Ken 1';
        user.email = 'nguyennk91@gmail.com';
        user.password = 'Password123';

        let salt = bcrypt.genSaltSync(10);
        let hashed = bcrypt.hashSync(user.password, salt);
        user.password = hashed;

        const user2 = new User();
        user2.firstName = 'Nguyen';
        user2.lastName = 'Ken 2';
        user2.email = 'nguyennk92@gmail.com';
        user2.password = 'Password123';

        salt = bcrypt.genSaltSync(10);
        hashed = bcrypt.hashSync(user2.password, salt);
        user2.password = hashed;

        await em.save(user);
        return await em.save(user2);
    }
}
