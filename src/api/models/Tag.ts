import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Dish } from './Dish';

@Entity('tags')
export class Tag {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'tag', unique: true })
    public tag: string;

    @OneToMany(type => Dish, dish => dish.tag, {
        cascadeInsert: true,
        cascadeUpdate: true,
    })
    public dishes: Dish[];

}
