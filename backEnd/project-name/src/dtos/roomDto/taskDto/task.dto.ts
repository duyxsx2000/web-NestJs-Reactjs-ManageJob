import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";


class Member {
    @IsString()
    idMember: string

    @IsString()
    role: string

    notify: boolean
    
    @IsString()
    name: string
}

class Action {
    @IsString()
    title: string

    date: Date

    @IsString()
    name: string

    @IsString()
    idMember: string
}
export class Task{
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    idTask: string

    
    @IsArray()
    @ValidateNested({ each: true })
    members: Member[]

    @IsArray()
    @ValidateNested({ each: true })
    action: Action[]

    @IsString()
    detail: string




}