import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from "typeorm";


@Entity('customers')
export class CustomerEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn()
    created: Date;

    @Column('text')
    name: string;

    @Column('numeric')
    age: number;

    @Column('text')
    gender: string;

    @Column('text')
    project_id: string;

    @Column('text')
    email: string;

    @Column('text')
    phone: string;

    @Column('text')
    address: string;
}
