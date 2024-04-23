import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

type Members = {
    idMember: string,
    role: string,
    date: Date,
    status: String
}

export type Userdocument = HydratedDocument<Room>;

export interface GroupInterface {
    idGroup: string,
    dateCreate: Date,
    members: Members[];
    rooms: string[]
};

@Schema()
export class Room {
    @Prop()
    idRoom: string

    @Prop()
    title: string

    @Prop()
    dateCreate: Date

    @Prop()
    background: string

    @Prop()
    priority: string

    @Prop()
    mainTask: string

    @Prop({
        type: [
            {
                idMember: String,
                name: String,
                role: String,
                date: Date,
                status: String,
                email: String
            }
        ]
    })
    members: {
        idMember: string,
        role: string,
        date: Date,
        status: string,
        email:string,
        name: string
    }[]

    @Prop({
        type: [
            {
                idTable: String,
                title: String
            }
        ]
    })
    tables: {
        idTable: string,
        title: string
    }[]

    @Prop({
        type: [
            {
                title: String,
                date: Date,
                idMember: String,
                nameMember: String
            }
        ]
    })
    actions:{
        title: string,
        date: Date,
        idMember: string,
        nameMember: string
    }[]


}
export const RoomSchema = SchemaFactory.createForClass(Room)


