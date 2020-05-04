import { Controller, Delete, Param, HttpException, HttpStatus, Body, Get, UseGuards, ValidationPipe, Post, UseFilters, Put, Logger, UsePipes } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';
import { TaskDTO } from './task.dto';
import { User } from 'src/users/user.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@UseGuards(AuthGuard)
@UseGuards(RolesGuard)
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
    @Roles('admin')
    showAll() {
        return this.tasksServie.showAll();
    }

    @Post('/create')
    @Roles('admin')
    @UseFilters(new ValidationExceptionFilter())
    @UsePipes(new ValidationPipe())
    create(@User('id') user, @Body() data: TaskDTO) {
        this.logData({ user, data });
        return this.tasksServie.create(user, data);
    }

    @Get(':id')
    @Roles('admin')
    read(@Param('id') id: string) {
        return this.tasksServie.read(id)
    }


    @Put(':id')
    @Roles('admin')
    @UseFilters(new ValidationExceptionFilter())
    @UsePipes(new ValidationPipe())
    update(@Param('id') id: string, @User('id') user ,@Body() data: Partial<TaskDTO>) {
        this.logData({ id, user, data });
        return this.tasksServie.update(id, user, data);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    delete(@Param('id') id: string, @User('id') user) {
        this.logData({ id, user });
        return this.tasksServie.delete(id, user);
    }
}
