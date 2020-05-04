import { Controller, Get, UseGuards, Post, Body, UseFilters, ValidationPipe, Param, Put, HttpException, HttpStatus, Delete } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Data } from 'src/decorators/data.decorator';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';
import { ProjectsService } from './projects.service';
import { ProjectDTO } from './project.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private projecstService: ProjectsService) { }

    @Get()
    @UseGuards(new AuthGuard())
    showAllUsers(@Data() task) {
        return this.projecstService.showAll();
    }

    @Post('/create')
    @UseFilters(new ValidationExceptionFilter())
    createUser(@Body(new ValidationPipe()) data: ProjectDTO) {
        return this.projecstService.create(data);
    }

    @Get(':id')
    readUser(@Param('id') id: string) {
        return this.projecstService.read(id)
    }


    @Put(':id')
    updateUser(@Param('id') id: string, @Body() data: Partial<ProjectDTO>) {
        return this.projecstService.update(id, data)
            .then((result) => {
                if (result) {
                    return result;
                } else {
                    throw new HttpException('Project not found!', HttpStatus.NOT_FOUND);
                }
            })
            .catch(() => {
                throw new HttpException('Project not found!', HttpStatus.NOT_FOUND);
            });
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.projecstService.delete(id)
            .then((result) => {
                if (result) {
                    return result;
                } else {
                    throw new HttpException('Project not found!', HttpStatus.NOT_FOUND);
                }
            })
            .catch(() => {
                throw new HttpException('Project not found!', HttpStatus.NOT_FOUND);
            });
    }
}
