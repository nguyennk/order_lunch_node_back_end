import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, Index, OneToMany } from 'typeorm';

import { Restaurant } from './Restaurant';
import { Image } from './Image';
import { Tag } from './Tag';
import { Integration } from './Integration';
import { OrderDish } from './OrderDish';

@Entity('restaurant_dishes')
@Index('dish_index_with_name_restaurant_id', ['name', 'restaurant_id', 'integration_id'], { unique: true })
export class Dish {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'description', nullable: true })
    public description: string;

    @IsNotEmpty()
    @Column({ name: 'restaurant_id' })
    public restaurant_id: number;

    @Column({ name: 'image_id', nullable: true })
    public image_id: number;

    @Column({ name: 'price', nullable: true })
    public price: number;

    @Column({ name: 'discount_price', nullable: true })
    public discount_price: number;

    @Column({ name: 'image_source', nullable: true })
    public image_source: string;

    @IsNotEmpty()
    @Column({ name: 'tag_id' })
    public tag_id: number;

    @Column({ name: 'integration_id', unique: true })
    public integration_id: number;

    @ManyToOne(type => Restaurant, restaurant => restaurant.dishes)
    @JoinColumn({ name: 'restaurant_id' })
    public restaurant: Restaurant;

    @OneToOne(type => Image)
    @JoinColumn({ name: 'image_id' })
    public image: Image;

    @OneToOne(type => Tag)
    @JoinColumn({ name: 'tag_id' })
    public tag: Tag;

    @OneToOne(type => Integration, integration => integration.dish, {
        cascadeInsert: true,
        cascadeUpdate: true
    })
    @JoinColumn({ name: 'integration_id' })
    public integration: Integration;

    @OneToMany(type => OrderDish, orderDish => orderDish.dish, {
        cascadeInsert: true,
        cascadeUpdate: true,
    })
    public orderDishes: OrderDish[];

    public toString(): string {
        return `${this.name}`;
    }

}
