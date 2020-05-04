import { IsNotEmpty, IsString, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {

    @ApiProperty({
        type: String,
        description: ""
    })
    @IsNotEmpty()
    username : string;

    @ApiProperty({
        type: String,
        description: ""
    })
    @IsNotEmpty()
    password : string;

    @ApiProperty({
        type: String,
        description: ""
    })
    @IsString()
    name : string;

    @ApiProperty({
        type: Number,
        description: ""
    })
    @IsInt()
    age : number;

    @ApiProperty({
        type: String,
        description: ""
    })
    @IsString()
    email : string;

    @ApiProperty({
        type: String,
        description: ""
    })
    @IsString()
    address : string;

    @ApiProperty({
        type: String,
        description: ""
    })
    @IsString()
    gender : string;

    
    @ApiProperty({
        type: String,
        description: ""
    })
    @IsString()
    position : string;

    @ApiProperty({
        type: String,
        description: ""
    })
    @IsString()
    phone : string;

    @ApiProperty({
        type: String,
        description: ""
    })
    @IsString()
    roles : string;
}

export class UserRO {
    id: string;
    username: string;
    created: Date;
    token? : string;
    roles :string
}
