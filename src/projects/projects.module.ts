import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './project.entity';
import { UserEntity } from 'src/users/user.entity';
import { TaskEntity } from 'src/tasks/task.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProjectEntity, UserEntity, TaskEntity])],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
