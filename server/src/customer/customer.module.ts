import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@hilma/auth-nest';

import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { ItemModule } from 'src/item/item.module';

@Module({
	imports: [TypeOrmModule.forFeature([Customer]), UserModule, ItemModule],
	providers: [CustomerService],
	controllers: [CustomerController],
	exports: [CustomerService]
})
export class CustomerModule { }
