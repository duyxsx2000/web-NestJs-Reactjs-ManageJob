import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { forwardRef } from '@nestjs/common/utils';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/users.schema';
import { Group, GroupSchema } from 'src/groups/schemas/group.schema';
@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }, {name:Group.name, schema: GroupSchema}]
      
    ),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '3600s'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService,]
})
export class AuthModule {}
