import { Module } from '@nestjs/common';

import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

import { AuthenticationMicroserviceConfig } from './services/authentication-micro-config.service';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.PRODUCTION ? '.prod.env' : '.local.env',
    }),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_MICRO',
        useClass: AuthenticationMicroserviceConfig,
        inject: [AuthenticationMicroserviceConfig],
      },
    ]),
  ],
  controllers: [AppController, AuthenticationController],
  providers: [
    AppService, 
    AuthenticationMicroserviceConfig, 
    AuthenticationService
  ],
})
export class AppModule {}
