import { HttpError } from 'routing-controllers';

export class TagNotFoundError extends HttpError {
    constructor() {
        super(404, 'Tag not found!');
    }
}
