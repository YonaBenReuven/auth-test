import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Customer } from 'src/customer/customer.entity';

@Entity()
export class Item {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@IsNotEmpty()
	@IsString()
	itemName: string;

	@Column()
	@IsNotEmpty()
	@IsNumber()
	price: number;

	@ManyToMany(type => Customer, customer => customer.items)
	customers: Customer[];
}