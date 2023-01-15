import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigDbService } from './configdb.service';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      envFilePath: process.env.PROD ? '.prod.env' : '.local.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: ConfigDbService,
      inject: [ConfigDbService],
    }),
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
