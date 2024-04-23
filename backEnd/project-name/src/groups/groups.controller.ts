import { Controller, Get, Request, UseGuards, ValidationPipe, Body, Post, Param, ParseIntPipe, ParseUUIDPipe, Delete, Patch } from '@nestjs/common';
import { GroupsService  } from './groups.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/manageRoles/roles.guard';
import { Roles } from 'src/auth/manageRoles/roles.decorator';
import { Role } from 'src/auth/manageRoles/role.enum';
import { CreateNewRoom} from 'src/dtos/roomDto/roomDto/createNewRoom';
import { ResponseData } from 'src/global/globalClass';
import { CreateGroup } from 'src/dtos/roomDto/groupDto/create-group.dto';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { CreateTable } from 'src/dtos/roomDto/tableDto/create-table.dto';
import { UpdateRoom } from 'src/dtos/roomDto/roomDto/update-room.dto';
import { CreateTask } from 'src/dtos/roomDto/taskDto/create-task.dto';


@UseGuards(AuthGuard,RolesGuard)
@Controller('group')
export class GroupsController {
    constructor(private readonly groupsService : GroupsService ){}
    @Post()
    async index() {
      
    }

    @Roles(Role.Admin)
    @Get('/admin/g')
    async GetDataGroupByAdmin(@Request() req) {
        
        return  {name:'ádmin'}
    };

    @Roles(Role.Admin)
    @Post('/create/g')
    async createGroup (
        @Request() req,
        @Body(ValidationPipe) createGroup: CreateGroup
    ): Promise<ResponseData<any>> {
        const user = req.user;

        await this.groupsService.createNewGroup (
            createGroup
        ); 

        return
    }

    
    @Get('/getGroup/admin/g')
    async findOneRoom(@Request() req): Promise<ResponseData<any>> {
        try {
            console.log(req.user.idUser);
            
            const user = req.user
            const group = await this.groupsService.findGroupByIdAndRole(user)
         
            return new ResponseData<{}>({title: 'get room Success', data: group}, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{}>({title: 'get room Success', data: undefined}, HttpStatus.ERROR, HttpMessage.ERROR)
        }
        
    };

}
