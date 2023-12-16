import { IsString, IsNotEmpty, IsEmail, IsNumber } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsEmail()
    email: string;
    
    @IsString()
    password: string;

    @IsNumber()
    wage: number;
    
    @IsNotEmpty()
    role: string
}