import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

class Task {
    @IsString()
    idTask: string

    @IsString()
    title: string
}

class Tables {
    @IsString()
    title: string

    @IsString()
    idTable: string

    @ValidateNested({each: true})
    tasks: Task[]
}
export class TableUpdate {
    @IsNotEmpty()

    @IsString()
    idRoom: string

    @ValidateNested({each: true})
    tables: Tables[]


}

