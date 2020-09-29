import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@hilma/auth-nest';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Admin]), UserModule],
	providers: [AdminService],
	controllers: [AdminController]
})
export class AdminModule { }
