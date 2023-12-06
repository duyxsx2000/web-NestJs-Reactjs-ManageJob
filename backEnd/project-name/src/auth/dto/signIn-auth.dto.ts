import { IsString, IsNotEmpty, IsEmail } from "class-validator";
export class SignInAuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsString()
    pass: string;
}