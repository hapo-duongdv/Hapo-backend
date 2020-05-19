import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn, ManyToOne } from "typeorm";
import { ProjectEntity } from "src/projects/project.entity";


@Entity('customers')
export class CustomerEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({type :'text', nullable: true})
    name: string;

    @Column({type :'text', nullable: true})
    age: string;

    @Column({type :'text', nullable: true})
    gender: string;

    @Column({type :'text', nullable: true})
    email: string;

    @Column({type :'text', nullable: true})
    phone: string;

    @Column({type :'text', nullable: true})
    address: string;

    @ManyToOne(type => ProjectEntity, project => project.customers)
    projects : ProjectEntity; 
}
