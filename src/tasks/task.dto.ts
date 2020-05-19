import { IsNotEmpty, IsString, IsInt } from "class-validator";
import { UserRO } from "src/users/user.dto";
import { ProjectRO } from "src/projects/project.dto";

export class TaskDTO {

    @IsString()
    name : string;

    @IsString()
    description : string;

    @IsString()
    status : string;

    @IsString()
    project : string;
}

export class TaskRO {
    id? : string;
    updated_at: Date;
    created_at : Date;
    name: string;
    description: string;
    status: string;
    project: string;
    author: UserRO;
}
