import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3333;
  const logger = new Logger();
  logger.log(process.env.AUTH_MICRO_HOST)
  await app.listen(port);
}

bootstrap();
