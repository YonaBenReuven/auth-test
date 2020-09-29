import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import configuration from './config/configuration'
import { AdminModule } from './admin/admin.module';
import { UserModule } from '@hilma/auth-nest';
import { ItemModule } from './item/item.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		UserModule,
		CustomerModule,
		AdminModule,
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', '..', 'client', 'build'),
		}),
		ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
		ItemModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
