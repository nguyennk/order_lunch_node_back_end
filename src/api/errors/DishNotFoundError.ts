import { HttpError } from 'routing-controllers';

export class DishNotFoundError extends HttpError {
    constructor() {
        super(404, 'Dish not found!');
    }
}
