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
import { UpdateNewTask } from 'src/dtos/roomDto/taskDto/updateNewTask.dto';
import { ChangeMember } from 'src/types/typeDefaults';
import { MemberTaskDto } from 'src/dtos/roomDto/taskDto/changeMemberTask.dto';

@Injectable()
export class TaskService {
    constructor (
        @InjectModel(Table.name) private TableModel: Model<Table>,
        @InjectModel(Task.name) private TaskModel: Model<Task>,
        @InjectModel(Room.name) private RoomModel: Model<Room>
    ) {}

    async createTask(createTask: CreateTask, user) {
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
                dates: {
                    datePost: new Date(Date.now()),
                },
                detail:'',
                actions: [
                    {
                        date: new Date(Date.now()),
                        idMember:user.idUser,
                        name: user.userName,
                        detail:`<p>${user.userName} created new Task</p>`,
                        
                    }
                ],
                members:[{
                    idMember: user.idUser,
                    name: user.userName,
                    role: 'Create',
                    notify: true

                }]
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
    };

    async updateTask(updateTask: UpdateNewTask) {

    
        
        
        const updateFields = {};

        for (const key in updateTask) {
          if (updateTask[key] !== undefined) {
            updateFields[key] = updateTask[key];
          }
        };
        console.log(updateFields);
        try {
            
            const updatedDocument = await this.TaskModel.findOneAndUpdate(
                {idTask: updateTask.idTask},
                { $set: updateFields },
                { new: true }
            );

            if(updateTask.change === 'set title') {
                
                await this.TableModel.updateOne(
                    {idTable: updateTask.idTable, "tasks.idTask": updateTask.idTask},
                    {
                        $set: {
                            'tasks.$':{
                                idTask: updateTask.idTask,
                                title: updateTask.title
                            }
                        }
                    }

                )
            };

            if(updateTask.change === 'add member') {
                
                const updatedDocument = await this.TaskModel.findOneAndUpdate(
                    {idTask: updateTask.idTask},
                    { $push: { members: { $each: updateTask.members[updateTask.members.length - 1] } } },
                    { new: true }
                );
            };

            if(updateTask.change === 'remove member') {
                
                const updatedDocument = await this.TaskModel.findOneAndUpdate(
                    {idTask: updateTask.idTask},
                    { $pull: { members: { $in: updateTask.members } } },
                    { new: true }
                );
            };
  
            
            return updateFields
        } catch (error) {
            console.log('error');
            
        }
    };


    async changeMemberTask(memberTaskDto: MemberTaskDto) {
        console.log(memberTaskDto,'ggg');

        if(memberTaskDto.action === 'Add member') {
            try {
                const updatedDocument = await this.TaskModel.findOneAndUpdate(
                    {idTask: memberTaskDto.idTask,},
                    { $push: { members: { $each: [{
                        idMember: memberTaskDto.idMember,
                        name: memberTaskDto.name,
                        role: 'Member',
                        notify: true
                    }]}}},
                    { new: true }
                );
                return updatedDocument
            } catch (error) {
                throw new NotFoundException('error')
            }
        };

        if(memberTaskDto.action === 'Remove member') {
            try {
                const updatedDocument = await this.TaskModel.findOneAndUpdate(
                    {idTask: memberTaskDto.idTask},
                    { $pull: {members: {idMember: memberTaskDto.idMember}} },
                    { new: true }
                );
                return updatedDocument
            } catch (error) {
                throw new NotFoundException('error')
            }
        }
        
    }

    async deleteTask(idTask: string, idTable) {
        try {
            await this.TaskModel.deleteOne({idTask: idTask});
            await this.TableModel.updateOne(
                {idTable: idTable},
                {
                    $pull: {
                        'tasks':{idTask: idTask}
                    }
                }
            )
        } catch (error) {
            
        }
    }
}
