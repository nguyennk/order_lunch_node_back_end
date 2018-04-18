import { HttpError } from 'routing-controllers';

export class CategoryNotFoundError extends HttpError {
    constructor() {
        super(404, 'Category not found!');
    }
}
