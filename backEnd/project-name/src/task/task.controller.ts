import { Body, Controller, Get, Param, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/manageRoles/roles.guard';
import { CreateTask } from 'src/dtos/roomDto/taskDto/create-task.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';

@UseGuards(AuthGuard,RolesGuard)
@Controller('task')
export class TaskController {
    constructor(private readonly taskservice: TaskService) {}

    @Post('create')
    async createTask(
        @Body(ValidationPipe) createTask: CreateTask,
        @Request() req

    ): Promise<ResponseData<any>> {
        const user = req.user
        try {         
            const roomAfterUpdate = await this.taskservice.createTask(createTask, user)         
            return new ResponseData<{}>({title: 'find room Error', data: roomAfterUpdate}, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<{}>({title: 'find room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    };

    @Get('getTask/:idTask')
    async getTaskById (
        @Param('idTask') idTask: string
    ) : Promise<ResponseData<any>> {
        try {       
            const task = await this.taskservice.findTaskById(idTask)
            return new ResponseData<{}>({title: 'find room Error', data: task}, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<{}>({title: 'find room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    };

}
