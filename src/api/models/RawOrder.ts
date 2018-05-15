import { RawOrderItem } from './RawOrderItem';
import { User } from './User';

export class RawOrder {
    public order_id?: number;
    public dishes: RawOrderItem[];
    public total: number;
    public error?: string;
    public user?: User;
}
