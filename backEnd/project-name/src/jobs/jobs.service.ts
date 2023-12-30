import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-Job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './schemas/job.schema';
import { Model } from 'mongoose';
import { threadId } from 'worker_threads';

@Injectable()

export class JobsService {
    constructor(@InjectModel(Job.name) private jobModel: Model<Job>){}
    
    async findOne(id: number) {
        try {
            const job = await this.jobModel.findOne({idJob: id})
            return job
        } catch (error) {
            throw new NotFoundException('error')   
        }
    };

    async findAll() {      
        try {
            const allJobs = await this.jobModel.find({status:'none'})
            console.log(allJobs);
            
            return allJobs
        } catch (error) {
            throw new NotFoundException('error')   
        }
    };

    async getStatistics(time: string) {

        const countJob = async (status: string) => {
            try {
                const res = await this.jobModel.aggregate([
                    {$match: {status: status}},
                    {$count: 'count'}
                ]);

                return res[0].count
            } catch (error) {                  
                return 0
            }
        };

        try {
            const countJobs = await this.jobModel.countDocuments()
            return {
                countJobs: countJobs,
                countDone: await countJob('done'),
                countAwait: await countJob('await'),
                countExpired: await countJob('await'),
                countError: await countJob('error'),
            }
           
        } catch (error) {
            throw new NotFoundException('error')
        }
    }

    async create(createJobDto: CreateJobDto) {
        console.log(createJobDto,'create1');
        
        try {
            const idMax = await this.jobModel.aggregate([
                {$group: {
                    _id: null,
                    maxId:{$max: '$idJob'}
                }}
            ]);
            const jobAddDatePosst = {
                ...createJobDto,
                status:'none',
                date: {
                    ...createJobDto.date,
                    post: new Date(Date.now())
                }
            }
            const newJob = {
                ...jobAddDatePosst, 
                idJob: idMax[0].maxId + 1,
 
            };

            const create = await this.jobModel.create(newJob);
            return newJob
        } catch (error) {
            throw new NotFoundException('error')
        }

    };

    async delete(id: number) {
        try {
            await this.jobModel.deleteOne({idJob: id})
            return null
        } catch (error) {
            throw new NotFoundException('error')   
        }

    };

    async updateJob(id: number, updateJobDto: UpdateJobDto) {
        try {
            await this.jobModel.updateOne(
                {idJob: id},
                {$set: updateJobDto}
            );
            const newJob = await this.jobModel.findOne({idJob: id});
            
            return newJob
        } catch (error) {
            throw new NotFoundException('error')
        }
        
    };

}
