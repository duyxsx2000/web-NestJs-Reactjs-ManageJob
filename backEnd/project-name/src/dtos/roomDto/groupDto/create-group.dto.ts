import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

class Member {
    @IsNotEmpty()
    @IsString()
    idMember: string

    @IsNotEmpty()
    @IsString()
    role: string

    @IsString()
    date: Date

    @IsString()
    email: string

    @IsString()
    name: string
};

export class CreateGroup {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    members: Member[];
}