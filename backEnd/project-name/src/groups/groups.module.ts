import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { MongooseModule } from '@nestjs/mongoose';
import {  Rooms, Roomschema } from './schemas/rooms.schema';
import { Group,GroupSchema} from './schemas/group.schema';
@Module({
  imports: [MongooseModule.forFeature([
    {name: Rooms.name, schema: Roomschema},
    {name: Group.name, schema: GroupSchema}
  ])],
  controllers: [GroupsController],
  providers: [GroupsService ]
})
export class GroupModule {}
