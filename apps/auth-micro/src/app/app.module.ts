import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigDbService } from './config-db.service';
import { AuthenticationModule } from './authentication/authentication.module';
console.log(process.env.DB_HOST)

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: process.env.PROD ? '.prod.env' : '.local.env',
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
  exports: [ConfigDbService]
})
export class AppModule {}
