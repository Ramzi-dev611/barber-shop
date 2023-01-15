import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigDbService } from './config-db.service';
import { AuthenticationModule } from './authentication/authentication.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      envFilePath: process.env.PRODUCTION ? '.env.prod' : '.env.local',
    }),
    UserModule,
    TypeOrmModule.forRootAsync({
      useClass: ConfigDbService,
      inject: [ConfigDbService],
    }),
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigDbService],
  exports: [ConfigDbService],
})
export class AppModule {}
