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

    async findAll(user: any, type: 'user' | 'admin' | 'leader') {    
        
        if(type === 'user') {
            try {
                const allJobs = await this.jobModel.find({status:'none'}) 
                return allJobs
            } catch (error) {
                throw new NotFoundException('error')   
            }
        };

        if(type === 'leader') {
            try {
                const allJobs = await this.jobModel.find({status:'none'})           
                return allJobs
            } catch (error) {
                throw new NotFoundException('error')   
            }
        };

        if(type === 'admin') {
            console.log('admin');
            
            try {
                const allJobs = await this.jobModel.aggregate([
                    {$sort:{updatedAt: -1}}
                ])   
  
                return allJobs

                
            } catch (error) {
                throw new NotFoundException('error')   
            }
        };

    };

    async create(createJobDto: CreateJobDto, user) {
        
        try {

            const idMax = await this.jobModel.aggregate([
                {$group: {
                    _id: null,
                    maxId:{$max: '$idJob'}
                }}
            ]);

            const jobAddDatePosst = {
                ...createJobDto,
                status:'waiting',
                idStaff: 1,
                idLeader:user.sub,
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
            const newJobPost = {
                ...updateJobDto,
                updatedAt: new Date(Date.now())
            };
            
            await this.jobModel.updateOne(
                {idJob: id},
                {$set: newJobPost}
            );
            const newJob = await this.jobModel.findOne({idJob: id});
            
            return newJob
        } catch (error) {
            throw new NotFoundException('error')
        }
        
    };

    async getStatistics(user: any, time: Date, type: 'DAY' | 'MONTH'| 'YEAR' | 'ALL') {
               console.log(user, time, type );
               
        const currentDate = new Date(time);
        const getCountJobByTime = async (status: string, timeType: 'DAY' | 'MONTH'| 'YEAR') => {
            let startOfTime, endOfTime;
        
            if (timeType === 'DAY') {
                startOfTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
                endOfTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0, -1); 
            } else if (timeType === 'MONTH') {
                startOfTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                endOfTime = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
            } else if (timeType === 'YEAR') {
                startOfTime = new Date(currentDate.getFullYear(), 0, 1);
                endOfTime = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59, 999);
                
                  
            } else {
                throw new Error('Invalid time type');
            };

            try {
                if(user.roles === 'leader') {
                    const countValidJobs = await this.jobModel.aggregate([
                        {
                            $match: {
                                updatedAt: {
                                    $gte: startOfTime,
                                    $lt: endOfTime
                                },
                                idLeader: user.sub
                                
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                status: 1
                            }
                        }
                    ]);

                    const count = {}
                    for(const job of countValidJobs) {
                        const status = job.status;
                        count[status] = (count[status] || 0) + 1;
                    }; 

                    const resulCountJobsByStatus = Object.entries(count).map(([status, count]) => ({ status, count }));  
                    return resulCountJobsByStatus;
                };

                if(user.roles === 'admin') {
                    const countValidJobs = await this.jobModel.aggregate([
                        {
                            $match: {
                                updatedAt: {
                                    $gte: startOfTime,
                                    $lt: endOfTime
                                },
                                idLeader: user.sub
                                
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                status: 1
                            }
                        }
                    ]);

                    const count = [
                        {status: 'completed', count:0},
                        {status: 'waiting', count:0},
                        {status: 'progress', count:0},
                        {status: 'new', count:0}
                    ];
                                           
                    for(const job of countValidJobs) {
                        const status = job.status;

                        const statusObject = count.find(item => item.status === status);
                        if (statusObject) {
                            statusObject.count += 1;
                        }
                    }; 

                    return count;
                };

            } catch (error) {
                throw new NotFoundException('error');
            }
        }; 

        if(type === 'ALL') {
            const countJobOfDay = await getCountJobByTime('none', 'DAY');
            const countJobOfMonth = await getCountJobByTime('none', 'MONTH');
            const countJobOfYear = await getCountJobByTime('none', 'YEAR');

            return {
                countJobOfDay,
                countJobOfMonth,
                countJobOfYear
            }
        };

        if(type === 'DAY') {
            const countJobOfDay = await getCountJobByTime('none', 'DAY');
            return {countJobOfDay,}
        };

        if(type === 'MONTH') {
            const countJobOfMonth = await getCountJobByTime('none', 'MONTH');
            return {countJobOfMonth,}
        }
      
    }
};


