import { Module } from '@nestjs/common';

import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

import { AuthenticationMicroserviceConfig } from './services/authentication-micro-config.service';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtConfigService } from './services/jwt-config.service';
import { JwtStrategy } from './services/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.PRODUCTION ? '.prod.env' : '.local.env',
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      useClass: JwtConfigService,
      inject: [JwtConfigService]
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
    AuthenticationService,
    JwtStrategy,
    JwtConfigService,
  ],
})
export class AppModule {}
