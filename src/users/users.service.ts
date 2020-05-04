import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {  InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO, UserRO } from './user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository : Repository<UserEntity>
    ){}

     async showAll(): Promise<UserRO[]> {
        const users = await this.userRepository.find({ relations: ['tasks']});
        return users.map(user => user.toResponseObject(false));
    }

    async create(data: UserDTO) {
        const user = await this.userRepository.create(data);
        await this.userRepository.save(data);
        return user;
    }

    async read(id: string) {
        const users = await this.userRepository.find({ where: { id },  relations: ['tasks']});
        return users.map(user => user.toResponseObject(false));
    }

    async update(id: string, data: Partial<UserDTO>) {
        await this.userRepository.findOne({ id });
        return this.userRepository.update({id}, data);
    }

    async delete(id: string) {
        await this.userRepository.findOne({ id });
        return await this.userRepository.delete({id});
    }

    async getInfor(data): Promise<UserRO> {
        const { username, password } = data;
        const user = await this.userRepository.findOne({where: { username }});
        return user.toResponseObject();
    }
    
    async login(data): Promise<UserRO> {
        const { username, password } = data;
        const user = await this.userRepository.findOne({where: { username }});
        if(!user || !(await user.comparePassword(password))){
            throw new HttpException(
                'Invalid username/password',
                HttpStatus.BAD_REQUEST,
            )
        }
        return user.toResponseObject();
    }

    async register(data: UserDTO): Promise<UserRO> {
        const { username } = data;
        // console.log(data);
        let user = await this.userRepository.findOne({where : {username}});
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        user = await this.userRepository.create(data);
        await this.userRepository.save(user);
        return user.toResponseObject();
    }
}
