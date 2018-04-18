import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { events } from '../subscribers/events';
import { env } from '../../env';

@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<User[]> {
        this.log.info('Find all users');
        return this.userRepository.find({ relations: ['feedbacks'] });
    }

    public findOne(id: number): Promise<User | undefined> {
        this.log.info('Find all users');
        return this.userRepository.findOne({ id });
    }

    public async create(user: User): Promise<User> {
        this.log.info('Create a new user => ', user.toString());
        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(user.password, salt);
        user.password = hashed;
        const newUser = await this.userRepository.save(user);
        this.eventDispatcher.dispatch(events.user.created, newUser);
        return newUser;
    }

    public async authenticate(user: User): Promise<User | undefined> {
        const compareUser = await this.userRepository
            .createQueryBuilder('user')
            .select(['user.password'])
            .where('user.email = :email', { email: user.email })
            .getOne();
        if (!compareUser) {
            return compareUser;
        }
        this.log.info('User to compare => ', compareUser.toString());
        const result = bcrypt.compareSync(user.password, compareUser.password); // true

        const return_user = result ? await this.userRepository.findOne({ email: user.email }) : undefined;
        if (return_user) {
            const token = jwt.sign({
                data: return_user
            }, env.auth.token, { expiresIn: '1h' });
            return_user.jwt_token = token;
        }
        return return_user;
    }

    public update(id: number, user: User): Promise<User> {
        this.log.info('Update a user');
        user.id = id;
        return this.userRepository.save(user);
    }

    public delete(id: string): Promise<void> {
        this.log.info('Delete a user');
        return this.userRepository.removeById(id);
    }

}
