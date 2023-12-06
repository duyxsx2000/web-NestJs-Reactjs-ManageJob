import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://duymongodb:cqJVG0Df7qF4r5s9@cluster0.hv3hrwq.mongodb.net/NestNew'),
    AuthModule,
    UsersModule,
    JobsModule, 
    
    
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
