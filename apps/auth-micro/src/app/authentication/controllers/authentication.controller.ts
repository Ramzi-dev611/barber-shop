import { Controller } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticationResponseDto, LoginDto, RegisterDto } from '@barber-shop/data-transfer-objects';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @MessagePattern({ cmd: 'login' })
  public async login(payload: LoginDto): Promise<AuthenticationResponseDto> {
    return await this.service.login(payload);
  }

  @MessagePattern({ cmd: 'register' })
  public async  register(
    payload: RegisterDto
  ): Promise<AuthenticationResponseDto> {
    console.log("hello")
    const response: AuthenticationResponseDto = await this.service.register(payload);
    console.log("bye")
    return response;
  }
}
