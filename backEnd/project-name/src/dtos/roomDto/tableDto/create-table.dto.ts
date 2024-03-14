import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class CreateTable {
    @IsNotEmpty()
    @IsString()
    title: string

}