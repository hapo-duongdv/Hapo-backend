import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { ProjectEntity } from 'src/projects/project.entity';

import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProjectEntity])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
