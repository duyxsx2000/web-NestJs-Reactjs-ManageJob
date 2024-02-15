import { Controller, Get, Post, Body, Param, ParseIntPipe, ValidationPipe, Query, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { Roles } from 'src/auth/manageRoles/roles.decorator';
import { Role } from 'src/auth/manageRoles/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/manageRoles/roles.guard';
import { UpdateUserDto } from './dto/updtae-user.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('users')

export class UsersController {
    constructor (private readonly usersService: UsersService){}
    
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


    @Post()
    async create(@Body(ValidationPipe) createUserDto: CreateUserDto ): Promise<ResponseData<{}>> {
       
        try {
           const newUser = await this.usersService.createUser(createUserDto) ;       
           return new ResponseData<{}>(newUser, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
           
        } catch (error) {
            return new ResponseData<{}>(null,  HttpStatus.ERROR, HttpMessage.ERROR)  
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
