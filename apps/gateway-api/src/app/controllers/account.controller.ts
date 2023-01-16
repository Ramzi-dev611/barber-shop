import { Body, Controller, Delete, Get, Logger, Put, UseGuards } from "@nestjs/common";
import { AccountService } from "../services/account.service";
import { UserDto } from "@barber-shop/data-transfer-objects";
import { Observable } from "rxjs";
import { GetUser } from "../decorators/get-user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { InjectMetric } from "@willsoto/nestjs-prometheus";
import { Counter } from "prom-client";
import { v4 as uuidv4 } from 'uuid'

@Controller('account')
export class AccountController {
  constructor(
    private readonly service: AccountService,
    @InjectMetric('HTTP_REQUEST_TOTAL')
    private readonly requestsCounter: Counter
  ) {}

  private readonly logger = new Logger();

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public getUser(@GetUser() user: UserDto): UserDto {
    this.requestsCounter.labels({ method: 'GET_MY_INFO', status: '200' }).inc()
    return user;
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  public updatteAccount(
    @Body() payload: UserDto,
    @GetUser() user: UserDto
  ): Observable<UserDto> | { error: string } {
    const requesID = uuidv4();
    try {
        const response = this.service.updateProfile(user.id, payload);
        this.requestsCounter
          .labels({ method: 'UPDATE_ACCOUNT', status: '201' })
          .inc();
        this.logger.log({
          request_id: requesID,
          user_id: user.id,
          content: 'Account Updated Successfully',
        });
        return response;
    }
    catch (error) {
        this.logger.error({
          content: error,
          request_id: requesID,
          user_id: user.id
        });
        this.requestsCounter
          .labels({ method: 'UPDATE_ACCOUNT', status: '500' })
          .inc();
        return { error: 'Something went wrong when updating the profile' }
    }
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  public deleteAccount(@GetUser() user: UserDto) {
    const requesID = uuidv4()
    try {
        const response = this.service.deleteUser(user.id);
        this.requestsCounter
          .labels({ method: 'DELETE_ACCOUNT', status: '205' })
          .inc();
        return response;
    } 
    catch (error) {
      this.logger.error({
        content: error,
        request_id: requesID,
        user_id: user.id,
      });        this.requestsCounter
      .labels({ method: 'DELETE_ACCOUNT', status: '500' })
      .inc();
      return { error: 'An Error Occured while deleting the account' }
    }
  }
}