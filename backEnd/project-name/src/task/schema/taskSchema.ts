import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

type Members = {
    idMember: string,
    role: string,
    date: Date
}

export type Userdocument = HydratedDocument<Task>;

export interface GroupInterface {
    idGroup: string,
    dateCreate: Date,
    members: Members[];
    rooms: string[]
};

@Schema()
export class Task {
    @Prop()
    idTask: string

    @Prop()
    title: string

    @Prop({type: [{
        date: Date,
        name: String,
        idMember: String,
        detail: String
    }]})
    action: {
        date: Date,
        name: string,
        idMember: string,
        detail:string
    }[]

    @Prop({type: [
        {
            idMember: String,
            name: String,
            role: String,
            notify: String
        }
    ]})    
    member: {
        idMember: string,
        name: string,
        role: string,
        notify: string
    }[]

    @Prop()
    detail: string


}
export const TaskSchema = SchemaFactory.createForClass(Task)


