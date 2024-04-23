import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class CreateTask {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsString()
    idTable: string

    @IsString()
    idRoom: string


}