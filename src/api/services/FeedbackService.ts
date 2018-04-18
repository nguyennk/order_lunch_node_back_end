import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Feedback } from '../models/Feedback';
import { FeedbackRepository } from '../repositories/FeedbackRepository';
import { events } from '../subscribers/events';
import { User } from '../models/User';

@Service()
export class FeedbackService {

    constructor(
        @OrmRepository() private feedbackRepository: FeedbackRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Feedback[]> {
        this.log.info('Find all feedbackes');
        return this.feedbackRepository.find();
    }

    public findByUser(user: User): Promise<Feedback[]> {
        this.log.info('Find all feedbackes of the user', user.toString());
        return this.feedbackRepository.find({
            where: {
                user_id: user.id,
            },
        });
    }

    public findOne(id: number): Promise<Feedback | undefined> {
        this.log.info('Find a feedback');
        return this.feedbackRepository.findOne({ id });
    }

    public async create(feedback: Feedback): Promise<Feedback> {
        this.log.info('Create a new feedback => ', feedback.toString());
        const newFeedback = await this.feedbackRepository.save(feedback);
        this.eventDispatcher.dispatch(events.feedback.created, newFeedback);
        return newFeedback;
    }

    public update(id: number, feedback: Feedback): Promise<Feedback> {
        this.log.info('Update a feedback');
        feedback.id = id;
        return this.feedbackRepository.save(feedback);
    }

    public delete(id: number): Promise<void> {
        this.log.info('Delete a feedback');
        return this.feedbackRepository.removeById(id);
    }

}
