import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class MemberTaskDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsString()
    idMember: string

    @IsString()
    action: string

    @IsString()
    idRoom: string

    @IsString()
    idTask: string


}