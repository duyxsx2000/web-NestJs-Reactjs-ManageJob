import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class Member {
    @IsNotEmpty()
    @IsString()
    idMember: string

    @IsNotEmpty()
    @IsString()
    role: string

    @IsString()
    status: string

    @IsString()
    name: string

    @IsString()
    email: string
};
class task {
    idTask: string
    title: string
}

class table {
    idTable:string
    title: string
}

export class CreateRoom {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsString()
    mainTask: string

    @IsString()
    background: string

    @IsString()
    priority: string

    @IsString()
    idGroup: string

    @IsString()
    idRoom: string

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    members: Member[];

    @ValidateNested({each: true})
    tables: table[]
};

