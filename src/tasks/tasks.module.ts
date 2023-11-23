import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { UserEntity } from 'src/users/user.entity';
import { ProjectEntity } from 'src/projects/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, UserEntity, ProjectEntity])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
