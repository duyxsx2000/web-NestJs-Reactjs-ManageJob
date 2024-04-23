import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";


class Task {
    @IsString()
    idTask: string

    @IsString()
    title: string
}
export class Table {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsString()
    idTable: string

    @ValidateNested({each: true})
    tasks: Task[]
}
