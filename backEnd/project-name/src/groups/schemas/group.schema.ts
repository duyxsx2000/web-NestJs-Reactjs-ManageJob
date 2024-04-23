import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

type Members = {
    idMember: string,
    role: string,
    date: Date
}
export type Userdocument = HydratedDocument<Group>;

export interface GroupInterface {
    idGroup: string,
    dateCreate: Date,
    members: Members[];
    rooms: string[]
};

@Schema()
export class Group {
    @Prop()
    idGroup: string

    @Prop()
    dateCreate: Date

    @Prop({
        type: [
            {
                idMember: String,
                role: String,
                date: Date,
                name: String,
                email:String
            }
        ]
    })
    members: {
        idMember: string,
        role: string,
        date: Date,
        name:string,
        email:string
    }[]

    @Prop({
        type: [
            {
                idRoom: String,
                title: String,
                mainTask: String,
                background: String,
                members: [{
                    idMember: String,
                    role: String,
                    status: String
                }]
            }
        ]
    })
    rooms: {
        idRoom: string,
        title: string,
        mainTask: string,
        background: string,
        members: {
            idMember:string,
            role: string,
            status: string
        }[]
    }[]


}
export const GroupSchema = SchemaFactory.createForClass(Group)


