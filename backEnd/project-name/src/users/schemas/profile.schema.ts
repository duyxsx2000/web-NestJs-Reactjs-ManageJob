import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/auth/manageRoles/role.enum';


export type Profiledocument = HydratedDocument<Profile>

@Schema()
export class Profile {
    @Prop()
    idUser: String

    @Prop({
        type: [
            {
                title: String,
                date: Date,

            }
        ]
    })
    actions:{
        title: string,
        date: Date,
    }[]

    @Prop({
        type: [
            {
                title: String,
                date: Date,
                name: String

            }
        ]
    })
    notify:{
        title: string,
        date: Date,
        name: string
    }[]
};

export const ProfileSchema = SchemaFactory.createForClass(Profile)