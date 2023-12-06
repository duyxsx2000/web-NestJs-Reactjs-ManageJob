import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type Userdocument = HydratedDocument<Job>

@Schema()
export class Job {
    @Prop()
    idJob: number

    @Prop({ type: { post: Date, start: Date, expired: Date } })
    date: {
        post: Date,
        start: Date,
        expriced: Date
    }
    
    @Prop()
    title: string

    @Prop()
    status: string

    @Prop()
    jobRecipient: string

    @Prop()
    describe: string

    @Prop()
    request: string

    @Prop()
    image: string
}

export const JobSchema = SchemaFactory.createForClass(Job)