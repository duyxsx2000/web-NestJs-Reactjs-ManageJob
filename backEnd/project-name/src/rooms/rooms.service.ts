import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { Rooms } from './schemas/rooms.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RoomsService {

    constructor(@InjectModel(Rooms.name) private roomsModel: Model<Rooms> ) {}

    async test() {
        const data = await this.roomsModel.find()
        console.log(data);  

        return {
            action: 'test',
            data: data

            
        }
    };

    async getDataRooms(id: string) {
        const data = await this.roomsModel.find()
        console.log(data);  
        try {
            type roomsbase = {
                id: string,
                users:{
                    idUser: string,
                    role: string
                }
            }[]
            const rooms = await this.roomsModel.aggregate([
                {
                    $match: {
                        'users.id': id
                    }
                }
            ])
        } catch (error) {
            
        }
        return {
            action: 'test',
            data: data

            
        }
    }
}
