import { Dish } from './Dish';

export class RawOrderItem {
    public dish_id: number;
    public count: number;
    public name: string;
    public dish: Dish;
}
