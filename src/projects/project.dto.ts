import { IsNotEmpty, IsString, IsInt, IsArray } from "class-validator";
import { UserRO } from "src/users/user.dto";
import { CustomerRO } from "src/customers/customer.dto";

export class ProjectDTO {

    @IsString()
    name : string;

    @IsString()
    description : string;

    @IsString()
    status : string;

}
export class ProjectRO {
    id? : string;
    updated_at: Date;
    created_at : Date;
    name: string;
    description: string;
    status: string;
    members: UserRO[];
    author: UserRO;
    customers: CustomerRO[]
}
