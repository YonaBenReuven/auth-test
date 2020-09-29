import { Controller, Get } from '@nestjs/common';
import { RequestUser, UseJwtAuth } from '@hilma/auth-nest';

import { Admin } from './admin.entity';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
	constructor(
		private readonly adminService: AdminService,
	) { }

	@Get('get-admin')
	@UseJwtAuth(Admin)
	async getAdmin(@RequestUser('id') adminId: string) {
		const { adminName } = await this.adminService.getAdmin(adminId);
		return { adminName };
	}
}
