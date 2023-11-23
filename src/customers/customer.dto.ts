import { IsNotEmpty, IsString, IsInt } from "class-validator";
import { ProjectRO } from "src/projects/project.dto";

export class CustomerDTO {

    @IsString()
    name : string;

    @IsString()
    email : string;

    @IsString()
    phone : string;

    @IsString()
    address : string;

    @IsString()
    age : string;

    @IsString()
    gender : string;

}

export class CustomerRO {
    id: string;
    updated_at: Date;
    created_at: Date;
    name: string;
    age:string;
    gender:string;
    email: string;
    phone: string;
    projects: ProjectRO;
}
