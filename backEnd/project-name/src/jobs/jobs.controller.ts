import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-Job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
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

    @Get()
    async findAll(): Promise<ResponseData<{}>> {
        try {
            const allJobs = await this.jobsService.findAll()
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

    @Get('dashboard/:time')
    async getStatistics(@Param('time') time: string): Promise<ResponseData<{}>> {
        try {
            const res = await this.jobsService.getStatistics('')
            return new ResponseData<{}>(res, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{}>(null, HttpStatus.ERROR, HttpMessage.ERROR)       
        }
    };
    
    @Roles(Role.Admin)
    @Post()
    async create(@Body(ValidationPipe) createJobDto: CreateJobDto): Promise<ResponseData<{}>> {
        console.log(createJobDto,'create');
        
        try {
            const res = await this.jobsService.create(createJobDto);
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
        try {
            const res = await this.jobsService.updateJob(id, updateJobDto);
            return new ResponseData<{}>(res, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{}>(null, HttpStatus.ERROR, HttpMessage.ERROR)   
        }    
    }

}
