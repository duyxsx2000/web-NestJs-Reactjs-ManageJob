import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TableService } from 'src/table/table.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Table, TableSchema } from 'src/table/schema/table.schema';
import { Room, RoomSchema } from 'src/room/schemas/room.schema';
import { Task, TaskSchema } from './schema/taskSchema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:Table.name, schema: TableSchema}, 
      {name:Room.name, schema: RoomSchema},
      {name:Task.name, schema: TaskSchema}
    ])
  ],
  controllers: [TaskController],
  providers: [TaskService,TableService]
})
export class TaskModule {}
