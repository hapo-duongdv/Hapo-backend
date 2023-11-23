import { Controller, HttpException, HttpStatus, Param, Delete, Body, Put, UseFilters, ValidationPipe, Post, UseGuards, Get, UsePipes } from '@nestjs/common';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';
import { AuthGuard } from 'src/guards/auth.guard';
import { Data } from 'src/decorators/data.decorator';
import { CustomersService } from './customers.service';
import { CustomerDTO, CustomerRO } from './customer.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) { }

    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin", "user")
    showAllUsers() {
        return this.customersService.showAll();
    }

    @Post('/create')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin")
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    createUser(@Body() data: CustomerDTO) {
        return this.customersService.create(data);
    }

    @Get(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin", "user")
    readUser(@Param('id') id: string) {
        return this.customersService.read(id)
    }


    @Put(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin")
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    updateUser(@Param('id') id: string, @Body() data: Partial<CustomerDTO>) {
        return this.customersService.update(id, data)
    }

    @Delete(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin")
    deleteUser(@Param('id') id: string) {
        return this.customersService.delete(id)
    }

    @Post('/add/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @UseFilters(ValidationExceptionFilter)
    @UsePipes(ValidationPipe)
    addCustomer( @Param('id') id: string ,@Body() data: CustomerRO ) {
        return this.customersService.getCustomer(id, data)
    }
}
