import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupModule } from './groups/groups.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TableModule } from './table/table.module';
import { TaskModule } from './task/task.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://duymongodb:cqJVG0Df7qF4r5s9@cluster0.hv3hrwq.mongodb.net/NestNew'),
    AuthModule,
    UsersModule,
    JobsModule,
    GroupModule,
    DashboardModule,
    TableModule,
    TaskModule,
    RoomModule,   
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
