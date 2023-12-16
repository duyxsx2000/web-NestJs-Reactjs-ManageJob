import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInAuthDto } from './dto/signIn-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async sign(signInAuthDto: SignInAuthDto) {
        try {
            const user = await this.usersService.findOneAuth(signInAuthDto.email);
            const {password, ...result} = user;
            console.log(password);
            if(password !== signInAuthDto.password) {
                throw new UnauthorizedException('Invalid password');
            }
            const payload = {sub: user.id, userName: user.name, roles: user.role, email: user.email};
            const userData = {role: user.role, name: user.name, id:user.id}
            return {
                access_token: await this.jwtService.signAsync(payload),
                

            }
        } catch (error) {
            return new UnauthorizedException()
        }
    };

    async profile(email: string) {
        try {
            const user =  await this.usersService.findOneAuth(email);
            const userData = {role: user.role, name: user.name, id:user.id, email: user.email}
            return userData
        } catch (error) {
            throw new Notification('error')
        }
    }
}
