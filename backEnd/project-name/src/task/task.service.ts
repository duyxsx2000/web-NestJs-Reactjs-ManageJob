import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './schema/taskSchema';
import { Table } from 'src/table/schema/table.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateNewTask } from 'src/dtos/roomDto/taskDto/createNewTask.dto';
import { CreateTask } from 'src/dtos/roomDto/taskDto/create-task.dto';
import { randumId } from 'src/utils/randumId';
import { UpdateTask } from 'src/dtos/roomDto/taskDto/update-task.dto';
import { Room } from 'src/room/schemas/room.schema';

@Injectable()
export class TaskService {
    constructor (
        @InjectModel(Table.name) private TableModel: Model<Table>,
        @InjectModel(Task.name) private TaskModel: Model<Task>,
        @InjectModel(Room.name) private RoomModel: Model<Room>
    ) {}

    async createTask(createTask: CreateTask, user:{idUser: string, name:string}) {
        try {
            const newId = async () => {
                const id = randumId('r')
                try {
                    const oldId = await this.TaskModel.findOne({idTask: id})
    
                    if(oldId) {                    
                       return newId()
                    };
    
                    return id
                } catch (error) {
                    return newId()
                }
            };
            const idTask = await newId()
            const newTask = {
                title: createTask.title,
                idTask: idTask,
                detail:'',
                action: [
                    {
                        date: new Date(Date.now()),
                        idMember:user.idUser,
                        detail:`<p>${user.name} created new Task</p>`,
                        
                    }
                ],
                members:[]
            };

            await this.TaskModel.create(newTask);
            await this.TableModel.updateOne(
                {idTable: createTask.idTable},
                {$push:{'tasks': {
                    title: newTask.title,
                    idTask: newTask.idTask
                }}}
            );
            
            const roomAfterChange = this.RoomModel.findOne({idRoom: createTask.idRoom})
            return roomAfterChange
        } catch (error) {
            throw new NotFoundException('error')
        }
    };

    async findTaskById(idTask: string) {
      
        try {
            const task = this.TaskModel.findOne({idTask: idTask})
            if(!task) throw new NotFoundException('error')
            return task
        } catch (error) {
            throw new NotFoundException('error')
        }
    }
    async updateTask(updateTask: UpdateTask) {

    }
}
