import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Restaurant } from './Restaurant';

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'category', unique: true })
    public category: string;

    @OneToMany(type => Restaurant, restaurant => restaurant.category, {
        cascadeInsert: true,
        cascadeUpdate: true,
    })
    public restaurants: Restaurant[];

    public toString(): string {
        return `${this.category}`;
    }

}
