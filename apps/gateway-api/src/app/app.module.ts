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
import { RoleAuthGuard } from './guards/role.guard';
import { AccountService } from './services/account.service';
import { AccountController } from './controllers/account.controller';
import { PostsMicroserviceConfig } from './services/posts-micro-config.service';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { PrometheusModule, makeCounterProvider } from '@willsoto/nestjs-prometheus';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.PRODUCTION ? '.env' : '.env.local',
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useClass: JwtConfigService,
      inject: [JwtConfigService],
    }),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_MICRO',
        useClass: AuthenticationMicroserviceConfig,
        inject: [AuthenticationMicroserviceConfig],
      },
      {
        name: 'POSTS_MICRO',
        useClass: PostsMicroserviceConfig,
        inject: [PostsMicroserviceConfig],
      },
    ]),
    PrometheusModule.register(),
  ],
  controllers: [
    AppController,
    AuthenticationController,
    AccountController,
    PostsController,
  ],
  providers: [
    makeCounterProvider({
      name: 'HTTP_REQUEST_TOTAL',
      help: 'this is a counter for the total http requests made',
      labelNames: ['method', 'status'],
    }),
    makeCounterProvider({
      name: 'QUERIES_PER_HASHTAG',
      help: 'this counts the number of requests that get received for posts by hashtag',
      labelNames: ['topic', 'method'],
    }),
    AppService,
    AuthenticationMicroserviceConfig,
    PostsMicroserviceConfig,
    AuthenticationService,
    JwtStrategy,
    JwtConfigService,
    RoleAuthGuard,
    AccountService,
    PostsService,
  ],
})
export class AppModule {}
