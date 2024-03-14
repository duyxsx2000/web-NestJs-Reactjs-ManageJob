import { IsString, IsNotEmpty, IsEmail} from "class-validator";
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;
   
    @IsEmail()
    email: string;
    
    @IsString()
    password: string;

    @IsNotEmpty()
    role: string

}
