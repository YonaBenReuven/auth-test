import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@hilma/auth-nest';

import { Item } from './item.entity';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Item]), UserModule],
	providers: [ItemService],
	exports: [ItemService],
	controllers: [ItemController]
})
export class ItemModule { }
