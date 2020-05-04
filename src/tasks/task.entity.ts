import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne, UpdateDateColumn } from "typeorm";
import { UserEntity } from "src/users/user.entity";


@Entity('tasks')
export class TaskEntity {
    
    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column('text')
    name: string;

    @Column('text')
    member_id: string;

    @Column('text')
    description: string;

    @Column('text')
    status: string;

    @ManyToOne(type => UserEntity, author => author.tasks)
    author: UserEntity;
}
