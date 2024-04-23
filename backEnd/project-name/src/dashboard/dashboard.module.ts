import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { GroupsService } from 'src/groups/groups.service';
import { UsersService } from 'src/users/users.service';
import { GroupModule } from 'src/groups/groups.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Rooms, Roomschema } from 'src/groups/schemas/rooms.schema';
import { Group, GroupSchema } from 'src/groups/schemas/group.schema';
import { User, UserSchema } from 'src/users/schemas/users.schema';


@Module({
  imports: [MongooseModule.forFeature([
    {name: Rooms.name, schema: Roomschema},
    {name: Group.name, schema: GroupSchema},
    {name: User.name, schema: UserSchema}
  ])],
  controllers: [DashboardController],
  providers: [
    DashboardService,
    GroupsService,
    UsersService
  ]
})
export class DashboardModule {}
