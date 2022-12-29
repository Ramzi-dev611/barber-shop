import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly repo :Repository<UserEntity>) {}

    public async getAllUsers(): Promise<UserEntity[]> {
        return await this.repo.find();
    }

    public async getUserById(id: string): Promise<UserEntity> {
        return await this.repo.findOneBy( {id} );
    }

    public async getUserByUsername(username: string): Promise<UserEntity> {
        return await this.repo.findOneBy({ username });
    }

    public async getUserByemail(email: string): Promise<UserEntity> {
        return await this.repo.findOneBy({ email });
    }

    public async createUser(user: UserEntity): Promise<UserEntity> {
        return await this.repo.save(user);
    }

    public async updateUser(id: string, user: UserEntity): Promise<UserEntity>{
        const newEntity = await this.repo.preload({
            id,
            ...user,
        });
        if (newEntity) {
            this.repo.save(newEntity);
            return newEntity;
        } else throw new NotFoundException('user with provided id not found');
    }

    public async deleteUser(id: string)  {
        return this.repo.delete({ id });
    }
}
