import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './schemas/room.schema';
import { Group, GroupSchema } from 'src/groups/schemas/group.schema';
import { GroupsService } from 'src/groups/groups.service';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Room.name, schema: RoomSchema},
    {name: Group.name, schema: GroupSchema},
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
