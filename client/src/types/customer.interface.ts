import { Item } from './item.interface';

export interface Customer {
	id: string;
    username: string;
	customerName: string;
	money: number;
	items: Item[];
}