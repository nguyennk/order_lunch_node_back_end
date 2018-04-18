import { HttpError } from 'routing-controllers';

export class AuthError extends HttpError {
    constructor() {
        super(404, 'Invalid Email or Password');
    }
}
