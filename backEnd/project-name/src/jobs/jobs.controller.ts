import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from '../dtos/jobDtos/create-Job.dto';
import { UpdateJobDto } from '../dtos/jobDtos/update-job.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/manageRoles/roles.guard';
import { Roles } from 'src/auth/manageRoles/roles.decorator';
import { Role } from 'src/auth/manageRoles/role.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @Get('/home')
    async findHome(@Request() req): Promise<ResponseData<{}>> {
        try {
            const allJobs = await this.jobsService.findAll(req.user, 'user')
            return new ResponseData<{}>(allJobs, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{}>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }

    };

    
    @Get('/admin')
    async findByRoleAdmin(@Request() req): Promise<ResponseData<{}>> {
        console.log(123);
        
        try {
            const allJobs = await this.jobsService.findAll(req.user, 'admin')
            return new ResponseData<{}>(allJobs, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{}>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    };
 
    @Roles(Role.Leader)
    @Get('/leader')
    async findByRoleLeader(@Request() req): Promise<ResponseData<{}>> {
        try {
            const allJobs = await this.jobsService.findAll(req.user, 'leader')
            return new ResponseData<{}>(allJobs, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{}>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    };

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseData<{}>> {

        try {
            const job = await this.jobsService.findOne(id)
            return new ResponseData<{}>(job, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{}>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
   
    };

    @Get('statistics/:time/:type')
    async getStatistics(@Param('time') time: Date, @Param('type') type: 'MONTH' | 'DAY' | 'ALL', @Request() req): Promise<ResponseData<{}>> {
        const user = req.user
        try {
            const res = await this.jobsService.getStatistics(user, time, type)
            console.log(res);
            return new ResponseData<{}>(res, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{}>(null, HttpStatus.ERROR, HttpMessage.ERROR)   
        }
    };
    
    @Roles(Role.Admin)
    @Post()
    async create(@Body(ValidationPipe) createJobDto: CreateJobDto, @Request() req): Promise<ResponseData<{}>> {
        const user = req.user
        try {
            const res = await this.jobsService.create(createJobDto, user);
            return new ResponseData<{}>(res, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{}>(null, HttpStatus.ERROR, HttpMessage.ERROR)   
        }

    };

    @Delete(':id')
    async delate(@Param('id', ParseIntPipe) id: number): Promise<ResponseData<{}>> {     
        try {
            const res = await this.jobsService.delete(id);
            return new ResponseData<{}>(res, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{}>(null, HttpStatus.ERROR, HttpMessage.ERROR)   
        }

    };

    @Patch(':id')
    async update(@Param('id',ParseIntPipe) id: number, @Body(ValidationPipe) updateJobDto: UpdateJobDto): Promise<ResponseData<{}>> {
        console.log('=====',updateJobDto);
        
        try {
            const res = await this.jobsService.updateJob(id, updateJobDto);
            return new ResponseData<{}>(res, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{}>(null, HttpStatus.ERROR, HttpMessage.ERROR)   
        }    
    };

    @Roles(Role.Admin)
    @Get('statistical')
    async statistical(){
        return
    }


}
