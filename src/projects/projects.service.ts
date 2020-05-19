import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, Any } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './project.entity';
import { ProjectDTO, ProjectRO } from './project.dto';
import { UserEntity } from 'src/users/user.entity';
import { UserRO, UserDTO } from 'src/users/user.dto';
import { TaskEntity } from 'src/tasks/task.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(TaskEntity)
        private taskRepository: Repository<TaskEntity>
    ) { }

    async getMember(projectId: string, user: Partial<UserDTO[]>){
        const project = await this.userRepository.findOne({where : {id : projectId}});
        if(!project){
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
        }
        await this.projectRepository.create({members : user});
        await this.projectRepository.save({...project, members : user});
        return {...project, members: user};
    }

    async showAll(): Promise<ProjectDTO[]> {
        return await this.projectRepository.find({ relations: ['tasks','author','members','customers'] });
    }

    async create(data: ProjectDTO, userId: string): Promise<ProjectRO> {
        const user = await this.userRepository.findOne({ where: { id: userId } })
        const { name } = data;
        let nameProject = await this.projectRepository.findOne({ where: { name } })
        if (nameProject) {
            throw new HttpException('Project already exists', HttpStatus.BAD_REQUEST);
        }
        if (!user) {
            throw new HttpException('user not found!', HttpStatus.NOT_FOUND);
        }
        const project = await this.projectRepository.create({ ...data, author: user });
        await this.projectRepository.save(project);
        return project;
    }

    async read(id: string) {
        const project = await this.projectRepository.findOne({ where: { id }, relations: ['tasks', 'members', 'author','customers'] });
        if (!project) {
            throw new HttpException("Project not found!", HttpStatus.NOT_FOUND)
        }
        return project;
    }

    async update(id: string, data: Partial<ProjectDTO>) : Promise<ProjectRO> {
        let project = await this.projectRepository.findOne({ where: { id }, relations: ['tasks', 'members', 'author','customers'] });
        if (!project) {
            throw new HttpException("Project not found!", HttpStatus.NOT_FOUND)
        }
        await this.projectRepository.update({ id }, data);
        project = await this.projectRepository.findOne({where :{id},  relations: ['tasks', 'members', 'author','customers']})
        return project;
    }

    async delete(id: string) {
        const project = await this.projectRepository.findOne({ where: { id }, relations: ['tasks', 'members', 'author','customers'] });
        if (!project) {
            throw new HttpException("Project not found!", HttpStatus.NOT_FOUND)
        }
        return await this.projectRepository.delete({ id });
    }
}
