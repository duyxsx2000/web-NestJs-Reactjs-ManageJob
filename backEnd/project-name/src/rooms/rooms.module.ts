import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, Rooms, groupSchema, roomschema } from './schemas/rooms.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Rooms.name, schema: roomschema},
    {name: Group.name, schema: groupSchema}
  ])],
  controllers: [RoomsController],
  providers: [RoomsService]
})
export class RoomsModule {}
