import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInAuthDto } from '../dtos/authDtos/signIn-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
@Injectable()
export class AuthService {
    private client: OAuth2Client;
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
        this.client = new OAuth2Client('769942165776-s6tqi38vnnl64chpl675v5fp2t9tfq4c.apps.googleusercontent.com');
    }

    async sign(signInAuthDto: SignInAuthDto) {
        try {
            const user = await this.usersService.findOneAuth(signInAuthDto.email);
            const {password, ...result} = user;

            if(password !== signInAuthDto.password) {
                throw new UnauthorizedException('Invalid password');
            };

            const payload = {idUser: user.idUser, userName: user.name, roles: user.role, email: user.email};
            return {
                access_token: await this.jwtService.signAsync(payload),
            };

        } catch (error) {
            return new UnauthorizedException()
        }
    };

    async validateGoogleToken(token: string): Promise<any> {
        const ticket = await this.client.verifyIdToken({
          idToken: token,
          audience: 'YOUR_GOOGLE_CLIENT_ID', // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const { sub, email, name, picture } = payload;
    
        let user = await this.usersService.findOneAuth(email);
    
        if (!user) {
            const user = await this.usersService.createUser({
                email: email,
                name:name,
                password:'google',
                role:'user'
            });
        }
        
        return {
            access_token: await this.jwtService.signAsync(payload),
        };

      }

    async profile(email: string) {
        try {
            const user =  await this.usersService.findOneAuth(email);
            const userData = {
                role: user.role,
                name: user.name,
                idUser:user.idUser,
                email: user.email, 
                notify:user.notify
            };
            return userData
        } catch (error) {
            throw new Notification('error')
        }
    }
}
