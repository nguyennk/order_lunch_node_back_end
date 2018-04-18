import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { FeedbackNotFoundError } from '../errors/FeedbackNotFoundError';
import { Feedback } from '../models/Feedback';
import { FeedbackService } from '../services/FeedbackService';

@Authorized()
@JsonController('/feedbacks')
export class FeedbackController {

    constructor(
        private feedbackService: FeedbackService
    ) { }

    @Get()
    public find(): Promise<Feedback[]> {
        return this.feedbackService.find();
    }

    @Get('/:id')
    @OnUndefined(FeedbackNotFoundError)
    public one(@Param('id') id: number): Promise<Feedback | undefined> {
        return this.feedbackService.findOne(id);
    }

    @Post()
    public create(@Body() feedback: Feedback): Promise<Feedback> {
        return this.feedbackService.create(feedback);
    }

    @Put('/:id')
    public update(@Param('id') id: number, @Body() feedback: Feedback): Promise<Feedback> {
        return this.feedbackService.update(id, feedback);
    }

    @Delete('/:id')
    public delete(@Param('id') id: number): Promise<void> {
        return this.feedbackService.delete(id);
    }

}
