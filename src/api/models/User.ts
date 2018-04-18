import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Feedback } from './Feedback';
import { OrderDish } from './OrderDish';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'first_name' })
    public firstName: string;

    @IsNotEmpty()
    @Column({ name: 'last_name' })
    public lastName: string;

    @IsNotEmpty()
    @Column()
    public email: string;

    @Column({ name: 'password_hash', select: false })
    public password: string;

    @Column()
    public is_admin: boolean;

    @OneToMany(type => Feedback, feedback => feedback.user, {
        cascadeInsert: true,
        cascadeUpdate: true,
    })
    public feedbacks: Feedback[];

    @OneToMany(type => OrderDish, orderDish => orderDish.user, {
        cascadeInsert: true,
        cascadeUpdate: true,
    })
    public orderDishes: OrderDish[];

    public jwt_token: string;

    public toString(): string {
        return `${this.firstName} ${this.lastName} (${this.email})`;
    }

}
