import { Controller } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { MessagePattern } from '@nestjs/microservices';
import { UserDto } from '@barber-shop/data-transfer-objects';

@Controller('user')
export class UserController {
  constructor(private readonly userRepo: UserService) {}
  @MessagePattern({ cmd: 'update' })
  public async updateAccount(
    id: string,
    user: UserDto
  ): Promise<UserDto> {
    return await this.userRepo.updateUser(id, user);
  }

  @MessagePattern({ cmd: 'delete' })
  public async deleteUser(id: string) {
    return await this.userRepo.deleteUser(id);
  }

  @MessagePattern({ cmd: 'get' })
  public async getUserById(id: string): Promise<UserDto> {
    return this.userRepo.getUserById(id);
  }
}
