import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const port = process.env.PORT || 3333;
  const host = process.env.HOST || '0.0.0.0';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    options: {
      port,
      host
    },
  });
  await app.listen();
}

bootstrap();
