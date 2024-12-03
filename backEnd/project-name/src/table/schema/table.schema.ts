import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

type Members = {
    idMember: string,
    role: string,
    date: Date
}

export type Userdocument = HydratedDocument<Table>;


@Schema()
export class Table {
    @Prop()
    idTable: string

    @Prop()
    title: string

    @Prop()
    status: string

    @Prop({type:[{
        idTask: String,
        title: String,
        members: [String]
    }]})
    tasks: {
        idTask: string,
        title: string
        members: string[]
    }

}
export const TableSchema = SchemaFactory.createForClass(Table)


