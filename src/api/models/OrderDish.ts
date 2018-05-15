import { IsNotEmpty } from 'class-validator';
import {
    Column,
    Entity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';

import { Dish } from './Dish';
import { Order } from './Order';
import { User } from './User';

@Entity('order_dishes')
export class OrderDish {
    @PrimaryGeneratedColumn('increment') public id: number;

    @IsNotEmpty()
    @Column({ name: 'order_id' })
    public order_id: number;

    @IsNotEmpty()
    @Column({ name: 'dish_id' })
    public dish_id: number;

    @IsNotEmpty()
    @Column({ name: 'count' })
    public count: number;

    @IsNotEmpty()
    @Column({ name: 'price' })
    public price: number;

    @IsNotEmpty()
    @Column({ name: 'user_id' })
    public user_id: number;

    @ManyToOne(type => Dish, dish => dish.orderDishes)
    @JoinColumn({ name: 'dish_id' })
    public dish: Dish;

    @ManyToOne(type => Order, order => order.orderDishes)
    @JoinColumn({ name: 'order_id' })
    public order: Order;

    @ManyToOne(type => User, user => user.orderDishes)
    @JoinColumn({ name: 'user_id' })
    public user: User;
}
