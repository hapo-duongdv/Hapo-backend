import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, OneToMany, ManyToOne, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { TaskEntity } from "src/tasks/task.entity";
import { ProjectEntity } from "src/projects/project.entity";
import { type } from "os";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date

    @Column({type :'text', nullable: true})
    username: string;

    @Column({type :'text', nullable: true})
    password: string;

    @Column({type :'text', nullable: true})
    name: string;

    @Column({type :'text', nullable: true})
    email: string;

    @Column({type :'text', nullable: true})
    age: string;

    @Column({type :'text', nullable: true})
    address: string;

    @Column({type :'text', nullable: true})
    roles: string;

    @Column({type :'text', nullable: true})
    phone: string;

    @Column({type :'text', nullable: true})
    gender: string;

    @Column({type :'text', nullable: true})
    position: string;

    @OneToMany(type => TaskEntity, task => task.author)
    tasks : TaskEntity[];

    @ManyToOne(type => ProjectEntity, project => project.members)
    projects : ProjectEntity; 
    
    @OneToOne(type => ProjectEntity, project => project.author)
    @JoinColumn()
    project: ProjectEntity

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    public toResponseObject( showToken: boolean = true) {
        const { id, created_at, name, username, token, roles, address, gender, position, email, phone } = this;
        const responseObject: any = { id, created_at, name,  username, address,  roles, gender, position, email, phone, token };
        if(showToken){
            responseObject.token = token;
        }
        if(this.tasks) {
            responseObject.tasks = this.tasks;
        }
        if(this.projects){
            responseObject.projects = this.projects;
        }
        return responseObject;
    }

    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password);
    }

    private get token(){
        const { id, username, roles } =  this;
        return jwt.sign({
            id, username, roles
        }, process.env.SECRET, {expiresIn: '2h'})
    } 
}
