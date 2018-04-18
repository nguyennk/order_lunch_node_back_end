import { EntityRepository, Repository } from 'typeorm';

import { OrderDish } from '../models/OrderDish';

@EntityRepository(OrderDish)
export class OrderDishRepository extends Repository<OrderDish>  {
    public findByUserIds(ids: number[]): Promise<OrderDish[]> {
        return this.createQueryBuilder()
            .select()
            .where(`order_dishes.user_id IN (${ids.map(id => `'${id}'`).join(', ')})`)
            .getMany();
    }

    public findByOrderIds(ids: number[]): Promise<OrderDish[]> {
        return this.createQueryBuilder()
            .select()
            .where(`order_dishes.order_id IN (${ids.map(id => `'${id}'`).join(', ')})`)
            .getMany();
    }
}
