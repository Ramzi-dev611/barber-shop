/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const port = process.env.PORT || 3333;
  const host = process.env.HOST || "0.0.0.0";
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    options: {
      host,
      port
  }
  });
  await app.listen();
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
