import { Controller } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userRepo: UserService) {}
  public async updateAccount(
    id: string,
    user: UserEntity,
  ): Promise<UserEntity> {
    return await this.userRepo.updateUser(id, user);
  }

  public async deleteUser(id: string){
    return await this.userRepo.deleteUser(id);
  }
}
