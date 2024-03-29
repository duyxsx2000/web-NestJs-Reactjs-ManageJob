import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongooseTimestamp from 'mongoose-timestamp';
export type Userdocument = HydratedDocument<Job>

@Schema()
export class Job {
  @Prop()
  idJob: number

  @Prop({ type: { post: Date, start: Date, expired: Date } })
  date: {
    post: Date,
    start: Date,
    expired: Date
  }
  
  @Prop()
  title: String

  @Prop()
  name: String
  @Prop()
  status: String

  @Prop()
  priority:String

  @Prop()
  deadline: String;

  @Prop()
  detail: String;

  @Prop()
  idLeader: Number;

  @Prop()
  idStaff: number;
  
  @Prop({ type: [Number], default: [] })
  recommend: Number[]; 
};

export const JobSchema = SchemaFactory.createForClass(Job)
JobSchema.plugin(mongooseTimestamp);