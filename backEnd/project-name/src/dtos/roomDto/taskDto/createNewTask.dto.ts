import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";


class Member {
    @IsString()
    idMember: string

    @IsString()
    role: string

    notify: boolean
    
    name: string
}

class Date {
    datePost: Date
    dateDeadlinestart:Date
    dateDeadlineEnd: Date

}
class Action {
    title: string

    date: Date

    name: string

    idMember: string
}
export class CreateNewTask {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsString()
    idTask: string

    @IsString()
    idTable: string

    
    @IsString()
    change: string

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    members: Member[];

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    actions: Action[]; 

    @IsString()
    detail: string; 

    @IsNotEmpty()
    @ValidateNested({ each: true })
    dates: Date; 



}