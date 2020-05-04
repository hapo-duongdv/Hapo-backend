import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { CustomersModule } from './customers/customers.module';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, TasksModule, ProjectsModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}