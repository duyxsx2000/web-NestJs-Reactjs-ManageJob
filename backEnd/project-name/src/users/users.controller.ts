import { Controller, Get, Post, Body, Param, ParseIntPipe, ValidationPipe, Query, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dtos/useDtos/create-user.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { Roles } from 'src/auth/manageRoles/roles.decorator';
import { Role } from 'src/auth/manageRoles/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/manageRoles/roles.guard';
import { UpdateUserDto } from '../dtos/useDtos/updtae-user.dto';


@Controller('users')

export class UsersController {
    constructor (private readonly usersService: UsersService){}
    
    @Get('/delall')
    async delall() {
        const data = await this.usersService.delAll()
        console.log('all1');
        
        return data
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Get()
    @Roles(Role.Admin)
    async findAll(@Request() req): Promise<ResponseData<{}>> {
        try {
            const email = req.user.email;
            const users = await this.usersService.findAllUsers(email)
            return new ResponseData<{}>(users, HttpStatus.SUCCESS, HttpMessage.SUCCESS)   
        } catch (error) {
            return new ResponseData<{}>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
 
    };

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id : number): Promise<ResponseData<{}>> {
         
        try {
            const user = await this.usersService.findOneUser(id)

            return new ResponseData<{}>(user, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            
        } catch (error) {
            return new ResponseData<{}>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
        
    }


    @Post('/create')
    async create(@Body(ValidationPipe) createUserDto: CreateUserDto ): Promise<ResponseData<{}>> {
       console.log('create1');
       
        try {
           const newUser = await this.usersService.createUser(createUserDto) ;       
           return new ResponseData<{}>(newUser, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
           
        } catch (error) {
            return new ResponseData<{}>('error',  HttpStatus.ERROR, HttpMessage.ERROR)  
        }
        
    };

    @Post(':id')
    async updateOne(@Param('id', ParseIntPipe)id: number , @Body(ValidationPipe) updateUserDto: UpdateUserDto): Promise<ResponseData<{}>> {
        try {
            const newUser = await this.usersService.updateUser(id,updateUserDto);           
            return new ResponseData<{}>(newUser, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            
         } catch (error) {
            return new ResponseData<{}>(null,  HttpStatus.ERROR, HttpMessage.ERROR)  
         }

    };

    @Roles(Role.Admin)
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<ResponseData<{}>> {
        try {
            const res = await this.usersService.delUser(id) 
            return new ResponseData<{}>(res, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            
         } catch (error) {
             return new ResponseData<{}>(null,  HttpStatus.ERROR, HttpMessage.ERROR)  
         }

    }

    
}
