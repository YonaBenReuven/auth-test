import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { Item } from 'src/item/item.entity';
import { ItemService } from 'src/item/item.service';

import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
	constructor(
		@InjectRepository(Customer)
		private readonly customerRepository: Repository<Customer>,
		private readonly itemService: ItemService
	) { }

	getMyItems(customerId: string) {
		return this.customerRepository
			.createQueryBuilder('user')
			.relation('items')
			.of(customerId)
			.loadMany<Item>();
	}

	async createCustomer(partialCustomer: DeepPartial<Customer>) {
		const customerInstance = this.customerRepository.create(partialCustomer);
		const customer = await this.customerRepository.save(customerInstance);
		return this.customerRepository
			.createQueryBuilder('customer')
			.relation('roles')
			.of(customer)
			.add(1);
	}

	getCustomers() {
		return this.customerRepository
			.createQueryBuilder('customer')
			.select(['customer.id', 'customer.customerName', 'customer.username', 'customer.money'])
			.getMany();
	}

	getCustomer(id: string) {
		return this.customerRepository
			.createQueryBuilder('customer')
			.select(['customer.id', 'customer.username', 'customer.customerName', 'customer.money'])
			.leftJoinAndSelect('customer.items', 'item')
			.whereInIds([id])
			.getOne();
	}

	updateMoney(customerId: string, amount: number) {
		return this.customerRepository
			.createQueryBuilder('customer')
			.update()
			.set({
				money: () => `money + ${amount}`
			})
			.whereInIds([customerId])
			.execute();
	}

	async getNotBought(id: string) {
		const allItems = await this.getMyItems(id);

		return this.itemService.getNotInIds(allItems.map(item => item.id))
	}

	async buyItem(customerId: string, itemId: number) {
		const item = await this.itemService.getItemPriceById(itemId);
		if (!item) throw new NotFoundException();

		await this.updateMoney(customerId, -item.price);

		return this.customerRepository
			.createQueryBuilder('customer')
			.relation('items')
			.of(customerId)
			.add(itemId);
	}

	async removeItem(customerId: string, itemId: number) {
		const item = await this.itemService.getItemPriceById(itemId);
		if (!item) throw new NotFoundException();

		await this.updateMoney(customerId, item.price);

		return this.customerRepository
			.createQueryBuilder('customer')
			.relation('items')
			.of(customerId)
			.remove(itemId);
	}


	deleteCustomer(customerId: string) {
		return this.customerRepository
			.createQueryBuilder()
			.delete()
			.where("id = :customerId", { customerId })
			.execute();
	}
}
