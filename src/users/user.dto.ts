import { IsNotEmpty, IsString, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ProjectRO } from "src/projects/project.dto";

export class UserDTO {

    @IsNotEmpty()
    username : string;

    @IsNotEmpty()
    password : string;

    @IsString()
    name : string;

    @IsString()
    age : string;

    @IsString()
    email : string;

    @IsString()
    address : string;

    @IsString()
    gender : string;

    
    @IsString()
    position : string;

    @IsString()
    phone : string;

    @IsString()
    roles : string;
}

export class UserRO {
    id: string;
    updated_at: Date;
    created_at: Date;
    username: string;
    name: string;
    age:string;
    gender:string;
    email: string;
    phone: string;
    position:string;
    roles :string;
    projects: ProjectRO;
}
