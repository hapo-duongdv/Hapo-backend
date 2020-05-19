import { Controller, Get, UseGuards, Post, Body, UseFilters, ValidationPipe, Param, Put, HttpException, HttpStatus, Delete, UsePipes } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Data } from 'src/decorators/data.decorator';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';
import { ProjectsService } from './projects.service';
import { ProjectDTO } from './project.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/users/user.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserDTO } from 'src/users/user.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private projecstService: ProjectsService) { }

    @Get()
    @UseGuards(AuthGuard,RolesGuard )
    @Roles("admin", "user")
    showAllProjects() {
        return this.projecstService.showAll();
    }

    @Post('/create')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin", "user")
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    createProject(@Body() data: ProjectDTO, @User('id') user) {
        return this.projecstService.create(data, user);
    }

    @Get(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin", "user")
    readProject(@Param('id') id: string) {
        return this.projecstService.read(id)
    }

    @Put(':id')
    @UseGuards(AuthGuard ,RolesGuard)
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    @Roles("admin", "user")
    updateProject(@Param('id') id: string, @Body() data: Partial<ProjectDTO>) {
        return this.projecstService.update(id, data)
    }

    @Delete(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin", "user")
    deleteProject(@Param('id') id: string) {
        return this.projecstService.delete(id)
    }

    @Put('/add/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    addMember(@Param('id') id: string, @Body() data: Partial<UserDTO[]>) {
        return this.projecstService.getMember(id, data)
    }
}
