import { HttpError } from 'routing-controllers';

export class RestaurantNotFoundError extends HttpError {
    constructor() {
        super(404, 'Restaurant not found!');
    }
}
