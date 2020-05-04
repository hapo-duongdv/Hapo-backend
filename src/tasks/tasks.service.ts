import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TaskDTO, TaskRO } from './task.dto';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskEntity)
        private taskRepository : Repository<TaskEntity>,
        @InjectRepository(UserEntity)
        private userRepository : Repository<UserEntity>
    ){}

    private toResponseObjectTask(tasks: TaskEntity): TaskRO {
        return {...tasks, author: tasks.author.toResponseObject(false)};
    }

    private ensureOwnership(task: TaskEntity, userId: string) {
        if(task.author.id !== userId){
            throw new HttpException('Incorret user', HttpStatus.UNAUTHORIZED);
        }
    }

    async showAll() : Promise<TaskRO[]> {
        const tasks =  await this.taskRepository.find({relations: ['author']});
        return tasks.map(task => this.toResponseObjectTask(task));
        // return await this.taskRepository.find({relations: ['author']});
    }

    async create(userId: string, data: TaskDTO): Promise<TaskRO> {
        const user =  await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new HttpException('user not found!', HttpStatus.NOT_FOUND);
        }
        const tasks = await this.taskRepository.create({...data, author: user});
        await this.taskRepository.save(tasks);
        // console.log("tasks: ", this.toResponseObjectTask(tasks))
        return this.toResponseObjectTask(tasks);
    }

    async read(id: string): Promise<TaskRO> {
        const task = await this.taskRepository.findOne( {where :{ id }, relations: ['author']});
        if (!task) {
            throw new HttpException('Task not found!', HttpStatus.NOT_FOUND);
        }
        return this.toResponseObjectTask(task);
    }

    async update(id: string, userId: string , data: Partial<TaskDTO>): Promise<TaskRO> {
        let task = await this.taskRepository.findOne({ where : { id }, relations: ['author'] })
        if (!task) {
            throw new HttpException('Task not found!', HttpStatus.NOT_FOUND);
        }
        this.ensureOwnership(task, userId);
        await this.taskRepository.update({id}, data);
        task = await this.taskRepository.findOne({ where:{ id }, relations: ['author'] });
        return this.toResponseObjectTask(task);  
    }

    async delete(id: string, userId: string) {
        const task = await this.taskRepository.findOne({ where: { id }, relations: ['author']});
        if (!task) {
            throw new HttpException('Task not found!', HttpStatus.NOT_FOUND);
        }
        this.ensureOwnership(task, userId);
        await this.taskRepository.delete({id});
        return this.toResponseObjectTask(task);     
    }
}
