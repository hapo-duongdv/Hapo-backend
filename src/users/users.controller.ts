import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards, UseFilters, Param, HttpException, HttpStatus, Delete, Put, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO, UserRO } from './user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Data } from 'src/decorators/data.decorator';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from './user.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    // @UseGuards(AuthGuard)
    showAllUsers() {
        return this.usersService.showAll();
    }

    @Post('/create')
    // @UseGuards(AuthGuard)
    @UseFilters(new ValidationExceptionFilter())
    createUser(@Body(new ValidationPipe()) data: UserDTO) {
        return this.usersService.create(data);
    }

    @Get(':id')
    // @UseGuards(AuthGuard)
    readUser(@Param('id') id: string) {
        return this.usersService.read(id)
    }


    @Put(':id')
    // @UseGuards(AuthGuard)
    updateUser(@Param('id') id: string, @Body() data: Partial<UserDTO>) {
        return this.usersService.update(id, data)
            .then((result) => {
                if (result) {
                    return result;
                } else {
                    throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
                }
            })
            .catch(() => {
                throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
            });
    }

    @Delete(':id')
    // @UseGuards(AuthGuard)
    deleteUser(@Param('id') id: string) {
        return this.usersService.delete(id)
            .then((result) => {
                if (result) {
                    return result;
                } else {
                    throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
                }
            })
            .catch(() => {
                throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
            });
    }

    @Post('/login')
    @UsePipes(new ValidationPipe())
    login(@Body() data) {
        return this.usersService.login(data);
    }

    @Post('/register')
    @UsePipes(new ValidationPipe())
    register(@Body() data: UserDTO) {
        return this.usersService.register(data);
    }
}
