import { RequestUser, RequestUserType, UseLocalAuth, UserService } from '@hilma/auth-nest';
import { Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { Admin } from './admin/admin.entity';
import { Customer } from './customer/customer.entity';

import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly userService: UserService
	) { }

	@Get('helloWorld')
	getHello(): string {
		return this.appService.getHello();
	}

	@Post('login')
	@UseLocalAuth(Admin, Customer)
	login(@RequestUser() user: RequestUserType, @Res() res: Response) {
		const body = this.userService.login(user, res);
		res.send(body);
	}
}
