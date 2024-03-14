import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongooseTimestamp from 'mongoose-timestamp';

export type Userdocument = HydratedDocument<Rooms, Group>

@Schema()
export class Rooms {
    @Prop()
    id: string;

    @Prop()
    title: string;

    @Prop({ type: [{ id: String, role: String }] })
    users: { id: string; role: string }[];

    @Prop({
        type: [{
            id: String,
            title: String,
            task: [{
                id: String,
                title: String,
                actions: [{
                    date: { type: Date, default: Date.now },
                    title: String,
                }],
                date: {
                    post: Date,
                    expired: Date
                },
                priority: String,
                describe: String
            }]
        }]
    })
    tables: {
        id: string,
        title: string,
        task: {
            id: string,
            title: string,
            actions: {
                date: { type: Date, default: Date },
                title: string,
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

export class Group {
    @Prop()
    id: string

    @Prop({
        type: [
            {
                id: String,
                role: String,
                date: Date
            }
        ]
    })
    users: {
        id: string,
        role: string,
        date: Date
    }[]

}
export const groupSchema = SchemaFactory.createForClass(Group)
export const roomschema = SchemaFactory.createForClass(Rooms)

