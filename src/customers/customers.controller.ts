import { Controller, HttpException, HttpStatus, Param, Delete, Body, Put, UseFilters, ValidationPipe, Post, UseGuards, Get } from '@nestjs/common';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';
import { AuthGuard } from 'src/guards/auth.guard';
import { Data } from 'src/decorators/data.decorator';
import { CustomersService } from './customers.service';
import { CustomerDTO } from './customer.dto';

@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) { }

    @Get()
    @UseGuards(new AuthGuard())
    showAllUsers(@Data() task) {
        return this.customersService.showAll();
    }

    @Post('/create')
    @UseFilters(new ValidationExceptionFilter())
    createUser(@Body(new ValidationPipe()) data: CustomerDTO) {
        return this.customersService.create(data);
    }

    @Get(':id')
    readUser(@Param('id') id: string) {
        return this.customersService.read(id)
    }


    @Put(':id')
    updateUser(@Param('id') id: string, @Body() data: Partial<CustomerDTO>) {
        return this.customersService.update(id, data)
            .then((result) => {
                if (result) {
                    return result;
                } else {
                    throw new HttpException('Customer not found!', HttpStatus.NOT_FOUND);
                }
            })
            .catch(() => {
                throw new HttpException('Customer not found!', HttpStatus.NOT_FOUND);
            });
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.customersService.delete(id)
            .then((result) => {
                if (result) {
                    return result;
                } else {
                    throw new HttpException('Customer not found!', HttpStatus.NOT_FOUND);
                }
            })
            .catch(() => {
                throw new HttpException('Customer not found!', HttpStatus.NOT_FOUND);
            });
    }
}
