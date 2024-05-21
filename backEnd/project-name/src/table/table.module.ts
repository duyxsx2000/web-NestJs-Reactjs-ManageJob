import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Table, TableSchema } from './schema/table.schema';
import { Room, RoomSchema } from 'src/room/schemas/room.schema';
import { RoomService } from 'src/room/room.service';
import { Group, GroupSchema } from 'src/groups/schemas/group.schema';
import { GroupsService } from 'src/groups/groups.service';
import { User, UserSchema } from 'src/users/schemas/users.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:Table.name, schema: TableSchema}, 
      {name:Room.name, schema: RoomSchema},
      {name:Group.name, schema: GroupSchema},
      {name:User.name, schema: UserSchema}
    ])
  ],
  controllers: [TableController],
  providers: [TableService, RoomService, GroupsService]
})
export class TableModule {}
