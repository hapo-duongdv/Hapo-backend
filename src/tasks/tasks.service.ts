import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TaskDTO, TaskRO } from './task.dto';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { ProjectEntity } from 'src/projects/project.entity';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskEntity)
        private taskRepository: Repository<TaskEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>
    ) { }

    private toResponseObjectTask(tasks: TaskEntity): TaskRO {
        return {
            ...tasks, author: tasks.author.toResponseObject(false),
            // tasks.projects
        }
    }

    private ensureOwnership(task: TaskEntity, userId: string, projectId: string) {
        if (task.author.id !== userId) {
            throw new HttpException('Incorret user', HttpStatus.UNAUTHORIZED);
        }
        // if (task.project.id !== projectId ) {
        //     throw new HttpException('Incorret project', HttpStatus.NOT_FOUND);
        // }
    }

    async showAll() {
        // const tasks =  await this.taskRepository.find({relations: ['author']});
        // return tasks.map(task => this.toResponseObjectTask(task));
        const tasks = await this.taskRepository.find({ relations: ['author', 'projects'] });
        return tasks
    }

    async create(userId: string, data: TaskDTO): Promise<TaskRO> {
        const { project } = data;
        const projects = await this.projectRepository.findOne({ where: { name : project } })
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new HttpException('user not found!', HttpStatus.NOT_FOUND);
        }
        const tasks = await this.taskRepository.create({ ...data, author: user, projects: projects });
        await this.taskRepository.save(tasks);
        return this.toResponseObjectTask(tasks);
    }

    async read(id: string): Promise<TaskRO> {
        const task = await this.taskRepository.findOne({ where: { id }, relations: ['author', 'projects'] });
        if (!task) {
            throw new HttpException('Task not found!', HttpStatus.NOT_FOUND);
        }
        return this.toResponseObjectTask(task);
    }

    async update(id: string, userId: string, projectId: string, data: Partial<TaskDTO>): Promise<TaskRO> {
        let task = await this.taskRepository.findOne({ where: { id }, relations: ['author', 'projects'] })
        if (!task) {
            throw new HttpException('Task not found!', HttpStatus.NOT_FOUND);
        }
        this.ensureOwnership(task, userId, projectId);
        await this.taskRepository.update({ id }, data);
        task = await this.taskRepository.findOne({ where: { id }, relations: ['author', 'projects'] });
        return this.toResponseObjectTask(task);
    }

    async delete(id: string, userId: string, projectId: string) {
        const task = await this.taskRepository.findOne({ where: { id }, relations: ['author', 'projects'] });
        if (!task) {
            throw new HttpException('Task not found!', HttpStatus.NOT_FOUND);
        }
        this.ensureOwnership(task, userId, projectId);
        await this.taskRepository.delete({ id });
        return this.toResponseObjectTask(task);
    }
}
