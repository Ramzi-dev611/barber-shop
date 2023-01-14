import { Controller } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { MessagePattern } from '@nestjs/microservices';
import { FetchCommandPayload, UserDto } from '@barber-shop/data-transfer-objects';

interface UpdatePayload {
  id: string;
  payload: UserDto;
}
@Controller('user')
export class UserController {
  constructor(private readonly userRepo: UserService) {}
  @MessagePattern({ cmd: 'UPDATE_ACCOUNT' })
  public async updateAccount(
    body: UpdatePayload
  ): Promise<UserDto> {
    const { id, payload } = body;
    return await this.userRepo.updateUser(id, payload);
  }

  @MessagePattern({ cmd: 'DELETE_ACCOUNT' })
  public async deleteUser(payload: FetchCommandPayload) {
    const { id } = payload; 
    return await this.userRepo.deleteUser(id);
  }

  @MessagePattern({ cmd: 'GET_ACCOUNT' })
  public async getUserById(payload: FetchCommandPayload): Promise<UserDto> {
    const { id } = payload;
    return this.userRepo.getUserById(id);
  }
}
