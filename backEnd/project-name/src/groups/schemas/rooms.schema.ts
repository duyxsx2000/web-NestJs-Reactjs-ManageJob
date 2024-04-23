import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type Userdocument = HydratedDocument<Rooms>

@Schema()
export class Rooms {
    @Prop()
    idRoom: string;

    @Prop()
    priority: string;

    @Prop()
    mainTask: string;

    @Prop()
    background: string;

    @Prop()
    title: string;

    @Prop({ type: [{ idMember: String, role: String }] })
    members: { idMember: string; role: string }[];

    @Prop({
        type: [
            {
                date: Date,
                title: String
            }
        ]
    })
    actions: {
        date: Date,
        title: string
    }[]

    @Prop({
        type: [{
            idTable: String,
            title: String,
            tasks: [{
                idTask: String,
                title: String,
                actions: [{
                    date: { type: Date, default: Date.now },
                    title: String,
                }],
                date: {
                    post: Date,
                    expired: Date
                },
                member:[{
                    id: String,
                    role: String,
                    notify: Boolean,
                    state: String
                }],
                priority: String,
                describe: String
            }]
        }]
    })
    tables: {
        idTable: string,
        title: string,
        tasks: {
            idTask: string,
            title: string,
            actions: {
                date: { type: Date, default: Date },
                title: string,
            }[],
            member: {
                id: string,
                role: string,
                notify: boolean,
                state: string
            }[],
            date: {
                post: Date,
                expired: Date
            },
            priority: string,
            detail: string
        }[]
    }[]
};

export const Roomschema = SchemaFactory.createForClass(Rooms);

export type RoomType = {
    title: string,
    mainTask: string,
    background: string,
    idRoom: string
};

export type RoleUser = {
    members: {
        idMember: string,
        role:string
    }[]
}

