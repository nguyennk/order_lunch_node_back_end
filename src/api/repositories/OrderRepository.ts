import { EntityRepository, Repository } from 'typeorm';

import { Order } from '../models/Order';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {}
