import { AuthenticationResponseDto, LoginDto, RegisterDto } from "@barber-shop/data-transfer-objects";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Injectable()
export class AuthenticationService {
  constructor(@Inject('AUTH_MICRO') private readonly client: ClientProxy) {}

  public login(
    payload: LoginDto
  ): Observable<Promise<AuthenticationResponseDto>> {
    const pattern = { cmd: 'login' };
    return this.client.send<Promise<AuthenticationResponseDto>>(
      pattern,
      payload
    );
  }

  public register(payload: RegisterDto): Observable<Promise<AuthenticationResponseDto>> {
    const pattern = { cmd: 'register' };
    return this.client.send<Promise<AuthenticationResponseDto>>(pattern, payload);
  }
}