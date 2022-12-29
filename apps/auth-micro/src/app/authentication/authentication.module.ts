import { Module } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationController } from './controllers/authentication.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtConfigService } from './services/jwt-config.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
      inject: [JwtConfigService]
    })
  ],
  providers: [AuthenticationService, JwtConfigService],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
