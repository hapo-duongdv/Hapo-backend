import { IsNotEmpty, IsString, IsInt } from "class-validator";

export class ProjectDTO {

    @IsString()
    name : string;

    @IsString()
    member_id : string;

    @IsString()
    customer_id : string;

    @IsString()
    description : string;

    @IsString()
    list_task : string;

    @IsString()
    status : string;

    @IsNotEmpty()
    created_at : string;

    @IsNotEmpty()
    updated_at : string;
}
