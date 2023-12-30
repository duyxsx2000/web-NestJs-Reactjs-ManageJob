import { IsString, IsNotEmpty, IsEmail, IsInt, Min, Max} from "class-validator";
import { TransformFnParams } from 'class-transformer';
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsEmail()
    email: string;
    
    @IsString()
    password: string;

    @IsString()
    position: string;

    @IsNotEmpty()
    phone: number;

    @IsString()
    level: string;
    
    @IsNotEmpty()
    role: string

    @IsNotEmpty()
    image: string
}
export type CreateUser = {
    email: string,
    name: string,
    position: string,
    role: string,
    level: string,
    phone: number,
    [key: string]: string | number;
}