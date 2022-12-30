import { Controller } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private readonly userRepo: UserService) {}
  @MessagePattern({ cmd: 'update' })
  public async updateAccount(
    id: string,
    user: UserEntity
  ): Promise<UserEntity> {
    return await this.userRepo.updateUser(id, user);
  }

  @MessagePattern({ cmd: 'delete' })
  public async deleteUser(id: string) {
    return await this.userRepo.deleteUser(id);
  }

  @MessagePattern({ cmd: 'get' })
  public async getUserById(id: string): Promise<UserEntity> {
    return this.userRepo.getUserById(id);
  }
}
