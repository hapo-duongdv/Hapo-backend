import { Controller, Delete, Param, HttpException, HttpStatus, Body, Get, UseGuards, ValidationPipe, Post, UseFilters, Put, Logger, UsePipes } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';
import { TaskDTO } from './task.dto';
import { User } from 'src/users/user.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Project } from 'src/projects/project.decorator';
import { UserDTO } from 'src/users/user.dto';

@Controller('tasks')
export class TasksController {

    private logger = new Logger('TasksController');
    
    constructor(private tasksServie: TasksService) { }

    private logData(options: any){
        options.user && this.logger.log('USER' + JSON.stringify(options.user));
        options.data && this.logger.log('DATA' + JSON.stringify(options.data));
        options.id && this.logger.log('TASK' + JSON.stringify(options.id));
    }

    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user", "admin")
    showAll() {
        return this.tasksServie.showAll();
    }

    @Post('/create')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin","user")
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    create(@User('id') user ,@Body() data: TaskDTO) {
        this.logData({ user, data });
        return this.tasksServie.create(user, data);
    }

    @Get(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin", "user")
    read(@Param('id') id: string) {
        return this.tasksServie.read(id)
    }


    @Put(':id')
    @UseGuards(AuthGuard,RolesGuard )
    @Roles("admin", "user")
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    update(@Param('id') id: string, @User('id') user , @Project('id') project ,@Body() data: Partial<TaskDTO>) {
        this.logData({ id, user, project, data });
        return this.tasksServie.update(id, user, project, data);
    }

    @Delete(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin", "user")
    delete(@Param('id') id: string, @User('id') user, @Project('id') project) {
        this.logData({ id, user, project });
        return this.tasksServie.delete(id, user, project);
    }
}
