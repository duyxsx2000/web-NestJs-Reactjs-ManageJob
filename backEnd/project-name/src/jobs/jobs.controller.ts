import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-Job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseData<{}>> {

        try {
            const job = await this.jobsService.findOne(id)
            return new ResponseData<{}>(job, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{}>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }

        
    };

    @Get()
    async findAll(): Promise<ResponseData<{}>> {
        try {
            const allJobs = await this.jobsService.findAll()
            return new ResponseData<{}>(allJobs, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ResponseData<{}>(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }

    };

    @Post()
    async create(@Body(ValidationPipe) createJobDto: CreateJobDto): Promise<ResponseData<{}>> {
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
