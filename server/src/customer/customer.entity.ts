import { ChildEntity, Column, JoinTable, ManyToMany } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '@hilma/auth-nest';

import { Item } from 'src/item/item.entity';

@ChildEntity()
export class Customer extends User {
	@IsNotEmpty()
	@IsString()
	username: string;

	@IsNotEmpty()
	@IsString()
	password: string;

	@Column()
	@IsNotEmpty()
	@IsString()
	customerName: string;

	@Column({ default: 0 })
	money: number;

	@ManyToMany(type => Item, item => item.customers)
	@JoinTable()
	items: Item[];
}