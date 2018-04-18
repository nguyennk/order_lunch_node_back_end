import { HttpError } from 'routing-controllers';

export class ImageNotFoundError extends HttpError {
    constructor() {
        super(404, 'Image not found!');
    }
}
