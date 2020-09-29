import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Query, ValidationPipe, } from '@nestjs/common';
import { RequestUser, UseJwtAuth } from '@hilma/auth-nest';

import { Admin } from 'src/admin/admin.entity';

import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
	constructor(
		private readonly customerService: CustomerService,
	) { }

	@UseJwtAuth(Customer)
	@Get('get-not-bought')
	getNotBought(@RequestUser('id') id: string) {
		return this.customerService.getNotBought(id);
	}

	@UseJwtAuth(Customer)
	@Get('get-my-items')
	getMyItes(@RequestUser('id') id: string) {
		return this.customerService.getMyItems(id);
	}

	@UseJwtAuth(Customer)
	@Post('buy-item/:id')
	async buyItem(@RequestUser('id') customerId: string, @Param('id', ParseIntPipe) itemId: number) {
		await this.customerService.buyItem(customerId, itemId);
		return { success: true };
	}

	@UseJwtAuth(Customer)
	@Post('remove-item/:id')
	async removeItem(@RequestUser('id') customerId: string, @Param('id', ParseIntPipe) itemId: number) {
		await this.customerService.removeItem(customerId, itemId);
		return { success: true };
	}

	@UseJwtAuth(Customer)
	@Get('get-customer')
	async getUserCustomer(@RequestUser('id') customerId: string) {
		const { customerName, money } = await this.customerService.getCustomer(customerId);
		return { customerName, money };
	}

	@Post('create-customer')
	@UseJwtAuth(Admin)
	createCustomer(@Body(ValidationPipe) customer: Customer) {
		return this.customerService.createCustomer(customer);
	}

	@Get('get-customers')
	@UseJwtAuth(Admin)
	getCustomers() {
		return this.customerService.getCustomers();
	}

	@Get('get-customers/:customerId')
	@UseJwtAuth(Admin)
	getCustomer(@Param('customerId', ParseUUIDPipe) customerId: string) {
		return this.customerService.getCustomer(customerId);
	}

	@Patch('update-customer-money/:customerId')
	@UseJwtAuth(Admin)
	updateCustomerMoney(@Param('customerId', ParseUUIDPipe) customerId: string, @Query('operator') operator: 'inc' | 'dec') {
		if (operator !== "dec" && operator !== "inc") throw new BadRequestException();
		return this.customerService.updateMoney(customerId, operator === "dec" ? -1000 : 1000);
	}

	@Delete('delete-customer/:customerId')
	@UseJwtAuth(Admin)
	deleteCustomer(@Param('customerId', ParseUUIDPipe) customerId: string) {
		return this.customerService.deleteCustomer(customerId);
	}
}
