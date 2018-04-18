import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Index } from 'typeorm';
import { Restaurant } from './Restaurant';
import { Dish } from './Dish';

@Entity('integrations')
@Index('my_index_with_id_and_text', ['type', 'source_id', 'source'], { unique: true })
export class Integration {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'source' })
    public source: string;

    @IsNotEmpty()
    @Column({ name: 'type' })
    public type: string;

    @IsNotEmpty()
    @Column({ name: 'source_id' })
    public source_id: number;

    @OneToOne(type => Restaurant, restaurant => restaurant.integration)
    public restaurant: Restaurant;

    @OneToOne(type => Dish, dish => dish.integration)
    public dish: Dish;

}
