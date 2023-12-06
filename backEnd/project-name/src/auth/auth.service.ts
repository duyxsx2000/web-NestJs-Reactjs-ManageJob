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
            const payload = {sub: user.id, userName: user.name, roles: user.role};
    
            return {
                access_token: await this.jwtService.signAsync(payload)
            }
        } catch (error) {
            return new UnauthorizedException()
        }
    }
}
