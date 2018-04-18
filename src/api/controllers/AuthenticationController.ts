import {
    Body, JsonController, Post, OnUndefined, Authorized, Get
} from 'routing-controllers';

import { User } from '../models/User';
import { UserService } from '../services/UserService';
import { AuthError } from '../errors/AuthError';

@JsonController('/auth')
export class AuthenticationController {

    constructor(
        private userService: UserService
    ) { }

    @Authorized()
    @Get('/login')
    public checkToken(): string {
        return 'Valid';
    }

    @Post('/signup')
    public create(@Body() user: User): Promise<User> {
        return this.userService.create(user);
    }

    @Post('/login')
    @OnUndefined(AuthError)
    public login(@Body() user: User): Promise<User | undefined> {
        return this.userService.authenticate(user);
    }
}
