import { Controller, Get, Post, Body, Param, ParseIntPipe, ValidationPipe, Query, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { Roles } from 'src/auth/manageRoles/roles.decorator';
import { Role } from 'src/auth/manageRoles/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/manageRoles/roles.guard';
import { UpdateUserDto } from './dto/updtae-user.dto';


@Controller('users')

export class UsersController {
    constructor (private readonly usersService: UsersService){}
    
    @UseGuards(AuthGuard, RolesGuard)
    @Get()
    @Roles(Role.Admin)
    findAll(): {} {
        return this.usersService.findAllUsers()
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


    @Post()
    async create(@Body(ValidationPipe) createUserDto: CreateUserDto ): Promise<ResponseData<{}>> {
        try {
           const newUser = await this.usersService.createUser(createUserDto) 
           console.log(newUser,'1');
           
           return new ResponseData<{}>(newUser, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
           
        } catch (error) {
            return new ResponseData<{}>(null,  HttpStatus.ERROR, HttpMessage.ERROR)  
        }
        
    };

    @Post(':id')
    async updateOne(@Param('id', ParseIntPipe)id: number , @Body(ValidationPipe) updateUserDto: UpdateUserDto): Promise<ResponseData<{}>> {
        try {
            const newUser = await this.usersService.updateUser(id,updateUserDto) 
            console.log(newUser,'1');
            
            return new ResponseData<{}>(newUser, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            
         } catch (error) {
            return new ResponseData<{}>(null,  HttpStatus.ERROR, HttpMessage.ERROR)  
         }

    };

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<ResponseData<{}>> {
        try {
            const res = this.usersService.delUser(id) 
            return new ResponseData<{}>(res, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            
         } catch (error) {
             return new ResponseData<{}>(null,  HttpStatus.ERROR, HttpMessage.ERROR)  
         }

    }
 

    
}
