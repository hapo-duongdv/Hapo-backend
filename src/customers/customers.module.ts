import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { ProjectEntity } from 'src/projects/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, ProjectEntity])],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
