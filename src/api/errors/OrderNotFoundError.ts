import { HttpError } from 'routing-controllers';

export class OrderNotFoundError extends HttpError {
    constructor() {
        super(404, 'Order not found!');
    }
}
