import { IsNotEmpty, IsString, IsInt } from "class-validator";

export class CustomerDTO {

    @IsString()
    name : string;

    @IsNotEmpty()
    project_id : string;

    @IsString()
    email : string;

    @IsString()
    phone : string;

    @IsString()
    address : string;

    @IsInt()
    age : number;

    @IsString()
    gender : string;

}
