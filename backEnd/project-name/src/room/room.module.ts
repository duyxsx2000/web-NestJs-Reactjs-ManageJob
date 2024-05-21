import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './schemas/room.schema';
import { Group, GroupSchema } from 'src/groups/schemas/group.schema';
import { GroupsService } from 'src/groups/groups.service';
import { User, UserSchema } from 'src/users/schemas/users.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Room.name, schema: RoomSchema},
    {name: Group.name, schema: GroupSchema},
   {name:User.name, schema: UserSchema}
  ])],
  providers: [
    RoomService,
    GroupsService
  ],
  controllers: [
    RoomController,
  ]
})
export class RoomModule {}
