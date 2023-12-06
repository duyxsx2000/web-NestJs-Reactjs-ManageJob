import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/manageRoles/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { AuthModule } from 'src/auth/auth.module';
import { forwardRef } from '@nestjs/common/utils';

@Module({
    imports:[MongooseModule.forFeature([{name:User.name, schema: UserSchema}])],
    controllers: [UsersController],
    providers: [
        UsersService,
        AuthGuard,

    ],
})
export class UsersModule {}
