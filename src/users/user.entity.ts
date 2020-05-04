import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, OneToMany } from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { TaskEntity } from "src/tasks/task.entity";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @Column('text')
    username: string;

    @Column('text')
    password: string;

    @Column('text')
    name: string;

    @Column('text')
    email: string;

    @Column('numeric')
    age: number;

    @Column('text')
    address: string;

    @Column({
        default: "admin"
        }
    )
    roles: string;

    @Column('text')
    phone: string;

    @Column('text')
    gender: string;

    @Column('text')
    position: string;

    @OneToMany(type => TaskEntity, task => task.author)
    tasks : TaskEntity[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    toResponseObject( showToken: boolean = true) {
        const { id, created_at, username, token, roles } = this;
        const responseObject: any = { id, created_at, username, roles };
        if(showToken){
            responseObject.token = token;
        }
        if(this.tasks) {
            responseObject.tasks = this.tasks
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
        }, process.env.SECRET, {expiresIn: '7d'})
    } 
}
