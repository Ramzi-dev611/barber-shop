import { Body, Controller, Post, Logger } from "@nestjs/common";
import { LoginDto, AuthenticationResponseDto, RegisterDto } from '@barber-shop/data-transfer-objects'
import { AuthenticationService } from "../services/authentication.service";
import { Observable } from "rxjs";
import { InjectMetric } from "@willsoto/nestjs-prometheus";
import { Counter } from "prom-client";
import { v4 as uuidv4 } from 'uuid'


@Controller()
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    @InjectMetric('HTTP_REQUEST_TOTAL')
    private readonly requestsCounter: Counter, 
  ) {}

  private readonly logger = new Logger();

  @Post('login')
  public login(
    @Body() payload: LoginDto
  ): Observable<Promise<AuthenticationResponseDto>> | { error: string } {
    const requestID = uuidv4()
    try {
      const response = this.authenticationService.login(payload);
      this.requestsCounter.labels({ method: 'login', status: '201' }).inc();
      return response;
    } catch (error) {
      this.requestsCounter.labels({ method: 'login', status: '500' }).inc();
      this.logger.error({ requestid: requestID, content: error });
      return { error: 'There has been an error in the login' };
    }
  }

  @Post('register')
  public register(
    @Body() payload: RegisterDto
  ): Observable<Promise<AuthenticationResponseDto>> | { error: string } {
    const requestID = uuidv4()
    try {
      const response = this.authenticationService.register(payload);
      this.requestsCounter.labels({ method: 'register', status: '201' }).inc();
      return response;
    } catch (error) {
      this.logger.error({request_id: requestID, content: error});
      return { error: 'There has been an error in the register' };
    }
  }
}