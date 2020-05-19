import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { Repository } from 'typeorm';
import { CustomerDTO, CustomerRO } from './customer.dto';
import { ProjectEntity } from 'src/projects/project.entity';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(CustomerEntity)
        private customersRepository : Repository<CustomerEntity>,
        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>
    ){}

    async getCustomer(projectId: string,  customer: CustomerRO ): Promise<CustomerRO>{
        const project = await this.projectRepository.findOne({where : {id : projectId}});
        if(!project){
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
        }
        if(customer.projects) {
            throw new HttpException("Customer had a project", HttpStatus.BAD_REQUEST)
        }
        await this.customersRepository.create({...customer ,projects : project});
        await this.customersRepository.save({...customer, projects: project});
        console.log({...customer, projects: project})
        return {...customer, projects: project};
    }

     async showAll(): Promise<CustomerRO[]> {
        return await this.customersRepository.find({relations : ['projects']});
    }

    async create(data: CustomerDTO) {
        const task = await this.customersRepository.create(data);
        await this.customersRepository.save(data);
        return task;
    }

    async read(id: string): Promise<CustomerRO[]> {
        const customer : any =  await this.customersRepository.findOne({where :{id} , relations : ['projects']});
        if(!customer){
            throw new HttpException("Customer not found!", HttpStatus.NOT_FOUND)
        }
        return customer;
    }

    async update(id: string, data: Partial<CustomerDTO>) {
        const customer = await this.customersRepository.findOne({where :{id} , relations : ['projects']});
        if(!customer){
            throw new HttpException("Customer not found!", HttpStatus.NOT_FOUND)
        }
        return this.customersRepository.update({id}, data);
    }

    async delete(id: string) {
        const customer = await this.customersRepository.findOne({where :{id} , relations : ['projects']});
        if(!customer){
            throw new HttpException("Customer not found!", HttpStatus.NOT_FOUND)
        }
        return await this.customersRepository.delete({id});
    }
}
