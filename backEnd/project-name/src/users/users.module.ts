import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthGuard } from 'src/auth/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';


@Module({
    imports:[MongooseModule.forFeature([{name:User.name, schema: UserSchema}])],
    controllers: [UsersController],
    providers: [
        UsersService,
        AuthGuard,
    ],
})
export class UsersModule {}
