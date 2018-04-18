import { EntityRepository, Repository } from 'typeorm';

import { Feedback } from '../models/Feedback';

@EntityRepository(Feedback)
export class FeedbackRepository extends Repository<Feedback>  {
    public findByUserIds(ids: number[]): Promise<Feedback[]> {
        return this.createQueryBuilder()
            .select()
            .where(`feedbacks.user_id IN (${ids.map(id => `'${id}'`).join(', ')})`)
            .getMany();
    }
}
