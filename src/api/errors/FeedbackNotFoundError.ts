import { HttpError } from 'routing-controllers';

export class FeedbackNotFoundError extends HttpError {
    constructor() {
        super(404, 'Feedback not found!');
    }
}
