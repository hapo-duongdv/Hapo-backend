import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
