import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
    ValidationPipe
  } from '@nestjs/common';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './auth.service';
  
import { SignInAuthDto } from '../dtos/authDtos/signIn-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body(ValidationPipe) signInDto: SignInAuthDto) {
   
      return this.authService.sign(signInDto)
    };

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) { 
      const email = req.user.email     
      return this.authService.profile(email);
    }
}
