import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

class Member {
    @IsNotEmpty()
    @IsString()
    id: string

    @IsNotEmpty()
    @IsString()
    rome: string
};

export class CreateRoom {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    member: Member[];
}