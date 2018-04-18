import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, Index, ManyToOne } from 'typeorm';

import { Dish } from './Dish';
import { Category } from './Category';
import { Image } from './Image';
import { Integration } from './Integration';

@Entity('restaurants')
@Index('restaurant_index_with_name_location_integration', ['name', 'location', 'integration_id'], { unique: true })
export class Restaurant {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'name', unique: true })
    public name: string;

    @Column({ name: 'location', nullable: true })
    public location: string;

    @Column({ name: 'phone_number', nullable: true })
    public phone_number: string;

    @Column({ name: 'image_id', nullable: true })
    public image_id: string;

    @Column({ name: 'image_source', nullable: true })
    public image_source: string;

    @IsNotEmpty()
    @Column({ name: 'category_id' })
    public category_id: number;

    @Column({ name: 'integration_id', unique: true })
    public integration_id: number;

    @OneToMany(type => Dish, dish => dish.restaurant, {
        cascadeInsert: true,
        cascadeUpdate: true,
    })
    public dishes: Dish[];

    @ManyToOne(type => Category, category => category.restaurants)
    @JoinColumn({ name: 'category_id' })
    public category: Category;

    @OneToOne(type => Image, image => image.restaurant)
    @JoinColumn({ name: 'image_id' })
    public image: Image;

    @OneToOne(type => Integration, integration => integration.restaurant, {
        cascadeInsert: true,
        cascadeUpdate: true
    })
    @JoinColumn({ name: 'integration_id' })
    public integration: Integration;

    public toString(): string {
        return `${this.name}`;
    }
}
