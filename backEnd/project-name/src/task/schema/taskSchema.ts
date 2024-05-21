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

    @Prop({
        type: {
            datePost: Date,
            dateDeadlineEnd: Date,
            dateDeadlineStart: Date
        }
    })
    dates: {
        datePost: Date,
        dateDeadlineStart: Date,
        dateDeadlineEnd: Date
    }

    @Prop({type: [{
        date: Date,
        name: String,
        idMember: String,
        detail: String
    }]})
    actions: {
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
            notify: Boolean
        }
    ]})    
    members: {
        idMember: string,
        name: string,
        role: string,
        notify: boolean
    }[]

    @Prop()
    detail: string


}
export const TaskSchema = SchemaFactory.createForClass(Task)


