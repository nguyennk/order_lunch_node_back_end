import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderDish } from './OrderDish';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('increment') public id: number;

    @IsNotEmpty()
    @Column({ name: 'state' })
    public state: string;

    @Column({ name: 'order_date' })
    public order_date: Date;

    @OneToMany(type => OrderDish, orderDish => orderDish.order, {
        cascadeInsert: true,
        cascadeUpdate: true,
    })
    public orderDishes: OrderDish[];

    public toString(): string {
        return `${this.state}`;
    }
}
