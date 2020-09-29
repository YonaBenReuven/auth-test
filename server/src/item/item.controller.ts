import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UseJwtAuth } from '@hilma/auth-nest';
import { Item } from './item.entity';
import { Admin } from 'src/admin/admin.entity';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
	constructor(
		private readonly itemService: ItemService
	) { }

	@Post('create-item')
	@UseJwtAuth(Admin)
	createItem(@Body(ValidationPipe) item: Item) {
		return this.itemService.createItem(item);
	}

	@Get('get-items')
	@UseJwtAuth(Admin)
	getItems() {
		return this.itemService.getItems();
	}

	@Get('get-items/:itemId')
	@UseJwtAuth(Admin)
	getItem(@Param('itemId', ParseIntPipe) itemId: number) {
		return this.itemService.getItem(itemId);
	}

	@Patch('update-item-price/:itemId')
	@UseJwtAuth(Admin)
	updateItemPrice(@Param('itemId', ParseIntPipe) itemId: number, @Query('operator') operator: 'inc' | 'dec') {
		if (operator !== "dec" && operator !== "inc") throw new BadRequestException();
		return this.itemService.updatePrice(itemId, operator === "dec" ? -1000 : 1000);
	}

	@Delete('delete-item/:itemId')
	@UseJwtAuth(Admin)
	deleteItem(@Param('itemId', ParseIntPipe) itemId: number) {
		return this.itemService.deleteItem(itemId);
	}
}
