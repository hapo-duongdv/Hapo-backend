import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany, UpdateDateColumn, OneToOne } from "typeorm";
import { TaskEntity } from "src/tasks/task.entity";
import { type } from "os";
import { UserEntity } from "src/users/user.entity";
import { CustomerEntity } from "src/customers/customer.entity";


@Entity('projects')
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column('text')
    name: string;

    @Column('text')
    description: string;

    @Column('text')
    status: string;

    @OneToMany(type => TaskEntity, task => task.projects)
    tasks : TaskEntity[];

    @OneToMany(type => UserEntity, member => member.projects)
    members: UserEntity[];

    @OneToMany(type => CustomerEntity, customer => customer.projects)
    customers: CustomerEntity[];

    @OneToOne(type => UserEntity , author => author.project)
    author : UserEntity;
}
