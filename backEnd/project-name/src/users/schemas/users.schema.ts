import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/auth/manageRoles/role.enum';


export type Userdocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    role: Role;

    @Prop()
    id: number
};

export const UserSchema = SchemaFactory.createForClass(User)