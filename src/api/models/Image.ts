import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Restaurant } from './Restaurant';
import { Dish } from './Dish';

@Entity('images')
export class Image {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'type' })
    public type: string;

    @IsNotEmpty()
    @Column({ name: 'source' })
    public source: string;

    @IsNotEmpty()
    @Column({ name: 'data' })
    public data: string;

    @OneToOne(type => Restaurant, restaurant => restaurant.image, {
        cascadeInsert: true,
        cascadeUpdate: true
    })
    public restaurant: Restaurant;

    @OneToOne(type => Dish, dish => dish.image, {
        cascadeInsert: true,
        cascadeUpdate: true
    })
    public dish: Dish;

}
