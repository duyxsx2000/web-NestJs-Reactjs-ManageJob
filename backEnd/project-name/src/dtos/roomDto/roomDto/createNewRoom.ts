import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

class Member {
    @IsNotEmpty()
    @IsString()
    idMember: string

    @IsNotEmpty()
    @IsString()
    role: string

    @IsString()
    status: string

    @IsString()
    name: string

    @IsString()
    email: string



};



export class CreateNewRoom {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsString()
    mainTask: string

    @IsString()
    background: string

    @IsString()
    priority: string

    @IsString()
    idGroup: string

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    members: Member[];
}