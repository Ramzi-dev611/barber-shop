import { UserDto } from "@barber-shop/data-transfer-objects";
import { Inject, Injectable} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Injectable()
export class AccountService{
  constructor(@Inject('AUTH_MICRO') private readonly client: ClientProxy) {}

  public updateProfile(id: string, user: UserDto): Observable<UserDto> {
    const pattern = { cmd: 'UPDATE_ACCOUNT' };
    return this.client.send<UserDto>(pattern , {
        id,
        payload: user,
    });
  }

  public deleteUser(id: string) {
    const pattern = { cmd: 'DELETE_ACCOUNT' }
    return this.client.send(pattern, id)
  }
}