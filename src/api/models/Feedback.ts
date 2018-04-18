import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { User } from './User';

@Entity('feedbacks')
export class Feedback {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'title' })
    public title: string;

    @IsNotEmpty()
    @Column({ name: 'content' })
    public content: string;

    @IsNotEmpty()
    @Column({ name: 'user_id' })
    public user_id: number;

    @ManyToOne(type => User, user => user.feedbacks)
    @JoinColumn({ name: 'user_id' })
    public user: User;

    public toString(): string {
        return `${this.title} ${this.content}`;
    }
}
