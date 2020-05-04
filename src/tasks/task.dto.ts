import { IsNotEmpty, IsString, IsInt } from "class-validator";
import { UserRO } from "src/users/user.dto";

export class TaskDTO {

    @IsString()
    name : string;

    @IsString()
    member_id : string;

    @IsString()
    description : string;

    @IsString()
    status : string;
}

export class TaskRO {
    id? : string;
    updated_at: Date;
    created_at : Date;
    name: string;
    member_id: string;
    description: string;
    status: string;
    author: UserRO;
}
