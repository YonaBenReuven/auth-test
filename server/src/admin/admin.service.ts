import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
	constructor(
		@InjectRepository(Admin)
		private readonly adminRepository: Repository<Admin>
	) { }

	getAdmin(adminId: string) {
		return this.adminRepository
			.createQueryBuilder('admin')
			.whereInIds([adminId])
			.getOne();
	}
}
