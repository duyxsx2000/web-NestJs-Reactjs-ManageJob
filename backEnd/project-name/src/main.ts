import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = {
    origin: "http://localhost:3000",
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    // preflightContinue: false,
    optionsSuccessStatus: 200,
    // credentials: true
  };
  app.enableCors(options);
  await app.listen(3002);
}
bootstrap();
