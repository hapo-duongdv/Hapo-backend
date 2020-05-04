import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './project.entity';
import { ProjectDTO } from './project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(ProjectEntity)
        private projectRepository : Repository<ProjectEntity>
    ){}

     async showAll(): Promise<ProjectDTO[]> {
        return await this.projectRepository.find();
    }

    async create(data: ProjectDTO) {
        const task = await this.projectRepository.create(data);
        await this.projectRepository.save(data);
        return task;
    }

    async read(id: string) {
        return await this.projectRepository.findOne({ id });
    }

    async update(id: string, data: Partial<ProjectDTO>) {
        await this.projectRepository.findOne({ id });
        return this.projectRepository.update({id}, data);
    }

    async delete(id: string) {
        await this.projectRepository.findOne({ id });
        return await this.projectRepository.delete({id});
    }
}
