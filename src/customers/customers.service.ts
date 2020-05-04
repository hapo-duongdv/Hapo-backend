import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { Repository } from 'typeorm';
import { CustomerDTO } from './customer.dto';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(CustomerEntity)
        private customersRepository : Repository<CustomerEntity>
    ){}

     async showAll(): Promise<CustomerDTO[]> {
        return await this.customersRepository.find();
    }

    async create(data: CustomerDTO) {
        const task = await this.customersRepository.create(data);
        await this.customersRepository.save(data);
        return task;
    }

    async read(id: string) {
        return await this.customersRepository.findOne({ id });
    }

    async update(id: string, data: Partial<CustomerDTO>) {
        await this.customersRepository.findOne({ id });
        return this.customersRepository.update({id}, data);
    }

    async delete(id: string) {
        await this.customersRepository.findOne({ id });
        return await this.customersRepository.delete({id});
    }
}
