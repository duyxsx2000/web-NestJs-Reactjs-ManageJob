import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";


class Member {
    @IsString()
    idMember: string

    @IsString()
    role: string

    notify: boolean
    
    name: string
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

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    members: Member[];

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    action: Action[]; 



}