import { Get, Injectable, NotFoundException } from '@nestjs/common';
import {  RoleUser, RoomType, Rooms } from './schemas/rooms.schema';
import { Group, GroupInterface} from './schemas/group.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randumId } from 'src/utils/randumId';
import { CreateNewRoom} from 'src/dtos/roomDto/roomDto/createNewRoom';
import { CreateGroup } from 'src/dtos/roomDto/groupDto/create-group.dto';

@Injectable()
export class GroupsService {

    constructor(
        // @InjectModel(Rooms.name) private RoomsModel: Model<Rooms>,
        @InjectModel(Group.name) private GroupModel: Model<Group> 
    ) {}

    async findGroupById(idGroup: string, idMember: string) {
        try {
            const group = await this.GroupModel.findOne({
                'idGroup': idGroup, 'members.idMember': idMember
            })

            if(!group) throw new NotFoundException('error')
            return group
        } catch (error) {
            throw new NotFoundException('error')
        }
    };
    
    async findGroupByIdAndRole(user): Promise<GroupInterface | null> {
        
        try {
            const groupByid = await this.GroupModel.aggregate([
                {
                    $match: {
                        'members.idMember':user.idUser,
                        'members.role': 'admin'
                    }
                },
                {
                    $limit: 1
                }
            ]);

            if(!groupByid[0]) {
                          
                await this.createNewGroup({
                    title: 'New Group',
                    members:[{
                        idMember: user.idUser,
                        name: user.userName,
                        email: user.email,
                        role:'admin',
                        date: new Date(Date.now())
                    }]
                });

                const groupByid = await this.GroupModel.aggregate([
                    {
                        $match: {
                            'members.idMember': user.idUser,
                            'members.role': 'admin'
                        }
                    },
                    {
                        $limit: 1
                    }
                ]);
                return groupByid[0]
            };

            return groupByid[0]
        } catch (error) {
            throw new NotFoundException('error')
        }
    };

 

    async createNewGroup (
        createGroup: CreateGroup
    ) {     
        const newId = async () => {
            const id = randumId('g')
            try {
                const oldId = await this.GroupModel.findOne({id: id})

                if(oldId) {                    
                   return newId()
                };

                return id
            } catch (error) {
                return newId()
            }
        };
       
       
        try {
            const idNewGroup = await newId();
            const newGroup = {
                idGroup:idNewGroup,
                ...createGroup,
                dateCreate: new Date(Date.now()),
                rooms:[]
            };
            await this.GroupModel.create(newGroup);    
            return newGroup
        } catch (error) {
            throw new NotFoundException('error')
        }
    };



}
