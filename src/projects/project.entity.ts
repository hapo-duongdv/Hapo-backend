import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from "typeorm";


@Entity('projects')
export class ProjectEntity {
    toResponeObject(arg0: boolean): any {
        throw new Error("Method not implemented.");
    }
    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn()
    created: Date;

    @Column('text')
    name: string;

    @Column('text')
    member_id: string;

    @Column('text')
    customer_id: string;

    @Column('text')
    list_task: string;

    @Column('text')
    description: string;

    @Column('text')
    status: string;

    @Column('text')
    created_at: string;

    @Column('text')
    updated_at: string;
}
