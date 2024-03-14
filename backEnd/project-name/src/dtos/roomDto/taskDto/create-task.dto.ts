import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class CreateTask {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    idTable: string
}