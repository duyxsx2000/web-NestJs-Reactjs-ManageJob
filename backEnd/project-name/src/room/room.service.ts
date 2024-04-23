import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './schemas/room.schema';
import { Model } from 'mongoose';
import { CreateNewRoom } from 'src/dtos/roomDto/roomDto/createNewRoom';
import { randumId } from 'src/utils/randumId';
import { GroupsService } from 'src/groups/groups.service';
import { Group } from 'src/groups/schemas/group.schema';
import { UpdateRoom } from 'src/dtos/roomDto/roomDto/update-room.dto';
import { Member } from 'src/dtos/roomDto/roomDto/create-room.dto';

@Injectable()
export class RoomService {
    constructor(
        @InjectModel(Room.name) private RoomsModel: Model<Room>,
        @InjectModel(Group.name) private GroupModel: Model<Group>,
        private groupService: GroupsService
        
    ) {}

    async createRoom(createRoom: CreateNewRoom, user) {

        const newId = async () => {
            const id = randumId('r')
            try {
                const oldId = await this.RoomsModel.findOne({idRoom: id})

                if(oldId) {                    
                   return newId()
                };

                return id
            } catch (error) {
                return newId()
            }
        };
        
        try {
            const idRoom = await newId();
            const newRoom = {
                title: createRoom.title,
                mainTask: createRoom.mainTask,
                members:createRoom.members,
                priority: createRoom.priority,
                background: createRoom.background,
                actions: [
                    {
                        idMember: user.idUser,
                        nameMember: user.userName,
                        title: 'Create new room',
                        date: new Date(Date.now())

                    }
                ],
                idRoom: idRoom
            };
            
            await this.RoomsModel.create(newRoom);
            await this.GroupModel.updateOne(
                {idGroup: createRoom.idGroup},
                {$push:{'rooms': {
                    title: newRoom.title,
                    background: newRoom.background,
                    mainTask: newRoom.mainTask,
                    idRoom: newRoom.idRoom,
                    members: [
                        {
                            idMember: user.idUser,
                            role: 'Admin',
                            status:'join'
                        }
                    ]
                }}}
            );
            const updateGroup = await this.GroupModel.findOne({idGroup: createRoom.idGroup});

            if(!updateGroup) throw new NotFoundException('error');
            return updateGroup;
        } catch (error) {
            throw new NotFoundException('error')
        }
    };

    async findOneroomById(idRoom: string, idUser: string) {
        try {  
            const roomByid = await this.RoomsModel.aggregate([
                {
                    $match: {
                        'idRoom':idRoom,
                        'members.idMember': idUser,
                        'members.status': 'join'
                    }
                },
                {
                    $limit: 1
                }
            ]);
            
            if(!roomByid[0]) {
                
                throw new NotFoundException('error')    
            };   
            return roomByid[0]
        } catch (error) {
            throw new NotFoundException('error')
        }
    }

    async deleteRoom(idRoom: string, idGroup: string, idUser: string) {
        type User = {
            role: string
        }
        try {
            const roomUpdate= await this.RoomsModel.findOne({
                idRoom: idRoom,
            });

            const member = roomUpdate.members.find(member => member.idMember === idUser)

            console.log(member);
            
            if(!member || member.role != 'Admin') throw new NotFoundException('error');

            await this.RoomsModel.deleteOne({idRoom: idRoom});
            await this.GroupModel.updateOne({
                'idGroup': idGroup,
                'rooms.idRoom': idRoom
            }, {
                $pull: {
                    'rooms': {idRoom : idRoom}
                }
            })
            const groupAfterUpdate = await this.groupService.findGroupById(idGroup, idUser)
            if(!groupAfterUpdate)throw new NotFoundException('error');
            return groupAfterUpdate
        } catch (error) {
            throw new NotFoundException('error')
        }
    }

    async updateRoomChangeIndexTable(updateRoom: UpdateRoom) {
        try {
            await this.RoomsModel.updateOne(
                {idRoom: updateRoom.idRoom},
                {$set:{'tables': updateRoom.tables}}
            );
            const newRoom = await this.RoomsModel.findOne({
                idRoom: updateRoom.idRoom
            });

            if(!newRoom) throw new NotFoundException('error');
            return newRoom
        } catch (error) {
            throw new NotFoundException('error')
        }
    };

    async joinRoom(idRoom: string, idGroup: string, user) {
        try {
            const member = await this.RoomsModel.findOne({
                'idRoom': idRoom,
                'members.idMember': user.idUser
            })
            if(member) throw new NotFoundException('error');

            await this.RoomsModel.updateOne(
                {idRoom: idRoom},
                {$push: {
                    members: {
                        idMember: user.idUser,
                        name: user.userName,
                        role: 'Member',
                        status:'waiting',
                        email: user.email
                    },
                }}
            );

            await this.GroupModel.updateOne(
                { "idGroup": idGroup, "rooms.idRoom": idRoom },
                { $push: { "rooms.$.members": {
                    idMember: user.idUser,
                
                    role: 'Member',
                    status: 'waiting'
                }}}
            )

            const groupAfterUpdate = await this.groupService.findGroupById(idGroup, user.idUser)
            if(!groupAfterUpdate) throw new NotFoundException('error');
            return groupAfterUpdate
        } catch (error) {
            throw new NotFoundException('error');
        }
    }

    async acceptMember(member: Member, idRoom: string) {
        try {
            await this.RoomsModel.updateOne({
                'idRoom': idRoom,
                'members.idMember': member.idMember 
            },
            {
                $set: {
                    'members.$.status': 'join',
                    'members.$.role': member.role, // Đặt trường accepted của thành viên đó thành true
                },
            });

            await this.RoomsModel.updateOne(
                {
                    'idRoom': idRoom,
                },
                {
                    $push: {
                        'actions': {
                            title: `${member.name} joined the room`,
                            date: new Date(Date.now()),
                        }
                    }
                }
            );

            await this.GroupModel.findOneAndUpdate(
                { 
                    "rooms.idRoom": idRoom 
                },
                { 
                    $set: { 
                        "rooms.$[outer].members.$[inner].status": "join" 
                    } 
                },
                {
                    arrayFilters: [
                        { "outer.idRoom": idRoom },
                        { "inner.idMember": member.idMember }
                    ],
                    new: true
                }
            );

            
            return 'ok'
        } catch (error) {
            throw new NotFoundException('error');
        }
    }

}
