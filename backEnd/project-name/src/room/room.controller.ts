import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/manageRoles/roles.guard';
import { RoomService } from './room.service';
import { CreateRoom, Member } from 'src/dtos/roomDto/roomDto/create-room.dto';
import { CreateNewRoom } from 'src/dtos/roomDto/roomDto/createNewRoom';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { Roles } from 'src/auth/manageRoles/roles.decorator';
import { Role } from 'src/auth/manageRoles/role.enum';
import { UpdateRoom } from 'src/dtos/roomDto/roomDto/update-room.dto';

@UseGuards(AuthGuard,RolesGuard)
@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Get('/getRoom/:idRoom')
    async getRoomByid(
        @Param('idRoom') idRoom: string,
        @Request() req
    ): Promise<ResponseData<{}>> {     
        try {
            console.log(idRoom, 'getRoom');
            
            const idUser = req.user.idUser;
            const room = await this.roomService.findOneroomById(idRoom, idUser);          
            if(!room){     
                new ResponseData<{}>(null, HttpStatus.ERROR, HttpMessage.ERROR)
            };
            return new ResponseData<{}>({title: 'find room Success', data: room}, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<{}>({title: 'find room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    };

    @Roles(Role.Admin)
    @Post('/createRoom/')
    async createNewRoom(
        @Body(ValidationPipe) createRoom: CreateNewRoom,
        @Request() req
    ): Promise<ResponseData<{}>> {
        const user = req.user
        
        try {
            const groupAfterUpdate = await this.roomService.createRoom(createRoom, user);

            if(!groupAfterUpdate) new ResponseData<{}>({title: 'create room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
            return new ResponseData<{}>({title: 'create room Success', data: groupAfterUpdate}, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<{}>({title: 'create room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    };

    @Patch('/updateRoom/:idRoom')
    async updateRoom(
        @Body(ValidationPipe) updateRoom: UpdateRoom
    ): Promise<ResponseData<{}>>  {
        try {
            const roomAfterUpdate = await this.roomService.updateRoomChangeIndexTable(updateRoom);

            if(!roomAfterUpdate) new ResponseData<{}>({title: 'update Room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
            return new ResponseData<{}>({title: 'update Room Success', data: roomAfterUpdate}, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<{}>({title: 'update Room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Post('/acceptMember/:idRoom')
    async acceptMember(
        @Body(ValidationPipe) member: Member,
        @Param('idRoom') idRoom: string
    ): Promise<ResponseData<{}>>  {
        try {
            const roomAfterUpdate = await this.roomService.acceptMember(member,idRoom);
            if(!roomAfterUpdate) new ResponseData<{}>({title: 'update Room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
            return new ResponseData<{}>({title: 'update Room Success', data: roomAfterUpdate}, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<{}>({title: 'update Room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Roles(Role.Admin)
    @Delete('/delete/:idRoom/:idGroup')
    async delateRoom(
        @Param('idGroup') idGroup: string,
        @Param('idRoom') idRoom: string,
        @Request() req
    ): Promise<ResponseData<{}>>  {
        try {
            const idUser = req.user.idUser;    
            const groupAfterUpdate = await this.roomService.deleteRoom(idRoom, idGroup, idUser);
            return new ResponseData<{}>({title: 'delete room Success', data: groupAfterUpdate}, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<{}>({title: 'delete room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Post('/waiting/joinRoom/:idRoom/:idGroup/:status')
    async JoinRoom(
        @Param('idRoom') idRoom: string,
        @Param('idGroup') idGroup: string,
        @Param('status') status: string,
        @Request() req
    ): Promise<ResponseData<{}>>  {          
        try {
            const groupAfterUpdate = await this.roomService.joinRoom(idRoom, idGroup, req.user, status)          
            if(!groupAfterUpdate) return new ResponseData<{}>({title: 'delete room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
            return new ResponseData<{}>({title: 'delete room Success', data: groupAfterUpdate}, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<{}>({title: 'delete room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    };

    @Post('/addMember/joinRoom/:idRoom/:idGroup/:idMember')
    async addMemberForRoom(
        @Param('idRoom') idRoom: string,
        @Param('idGroup') idGroup: string,
        @Param('idMember') idMember: string,
    ): Promise<ResponseData<{}>>  {          
        try {

            const room = await this.roomService.addMemberForRoom(idRoom,idGroup,idMember)       
            // const groupAfterUpdate = await this.roomService.addMemberForRoom(idRoom, idGroup, '')          
            if(!room) return new ResponseData<{}>({title: 'delete room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
            return new ResponseData<{}>({title: 'add member room Success', data: room}, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<{}>({title: 'add member room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    };

    // @Patch('/deleteMember/:idRoom/:idGroup/:idMember')
    // async deleteMemberForRoom(
    //     @Param('idRoom') idRoom: string,
    //     @Param('idGroup') idGroup: string,
    //     @Param('idMember') idMember: string,
    //     @Request() req
    // ): Promise<ResponseData<{}>>  {   
    //     const user = req.user       
    //     try {

    //         const room = await this.roomService.addMemberForRoom(idRoom,idGroup,idMember)       
    //         // const groupAfterUpdate = await this.roomService.addMemberForRoom(idRoom, idGroup, '')          
    //         // if(!groupAfterUpdate) return new ResponseData<{}>({title: 'delete room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
    //         return new ResponseData<{}>({title: 'delete room Success', data: ''}, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    //     } catch (error) {
    //         return new ResponseData<{}>({title: 'delete room Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
    //     }
    // };

    @Patch('/deleteMember/:idRoom/:idGroup/:idMember')
    async deleteMember(
        @Param('idRoom') idRoom: string,
        @Param('idGroup') idGroup: string,
        @Param('idMember') idMember: string,
        @Request() req
    ): Promise<ResponseData<{}>>  {   
        const user = req.user       
        try {
            console.log('delete',idMember);
            
            const roomAfterUpdate = await this.roomService.deleteMember(idRoom,idGroup,idMember, user)       
            return new ResponseData<{}>({title: 'remove member Success', data: roomAfterUpdate}, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<{}>({title: 'remove member Error', data: null}, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    };
    

}
