import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemService {
	constructor(
		@InjectRepository(Item)
		private readonly itemRepository: Repository<Item>
	) { }

	async createItem(partialItem: DeepPartial<Item>) {
		const item = this.itemRepository.create(partialItem);
		return this.itemRepository.save(item);
	}

	getNotInIds(ids: number[]) {
		if (ids.length === 0) return this.itemRepository.find();

		return this.itemRepository
			.createQueryBuilder('item')
			.where("item.id NOT IN (:...ids)", { ids })
			.getMany();
	}

	getItemPriceById(id: number) {
		return this.itemRepository
			.createQueryBuilder('item')
			.select('item.price')
			.whereInIds([id])
			.getOne();
	}

	getItems() {
		return this.itemRepository.find();
	}

	getItem(itemId: number) {
		return this.itemRepository
			.createQueryBuilder('item')
			.whereInIds([itemId])
			.getOne();
	}

	updatePrice(itemId: number, amount: number) {
		return this.itemRepository
			.createQueryBuilder('item')
			.update()
			.set({
				price: () => `price + ${amount}`
			})
			.whereInIds([itemId])
			.execute();
	}

	deleteItem(itemId: number) {
		return this.itemRepository
			.createQueryBuilder()
			.delete()
			.where("id = :itemId", { itemId })
			.execute();
	}
}
