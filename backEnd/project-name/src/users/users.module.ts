import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthGuard } from 'src/auth/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { Group, GroupSchema } from 'src/groups/schemas/group.schema';
import { GroupsService } from 'src/groups/groups.service';


@Module({
    imports:[
        MongooseModule.forFeature([{name:User.name, schema: UserSchema}]),
        MongooseModule.forFeature([{name:Group.name, schema: GroupSchema}])
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        AuthGuard,
        GroupsService
    ],
})
export class UsersModule {}
