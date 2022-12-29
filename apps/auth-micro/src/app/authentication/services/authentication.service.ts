import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { LoginDto, AuthenticationResponseDto, TokenPayloadDto, RegisterDto } from '@barber-shop/data-transfer-objects'
import { UserEntity } from '../../user/entities/user.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepo: UserService,
    private readonly jwtService: JwtService
  ) {}

  public async register(payload: RegisterDto): Promise<AuthenticationResponseDto> {
    const userByEmail = await this.userRepo.getUserByemail(payload.email);
    const userByUsername = await this.userRepo.getUserByUsername(payload.username);
    if(userByEmail) {
        throw new UnauthorizedException('email already used. Use another one');
    }
    if (userByUsername) {
      throw new UnauthorizedException('username already used. Use another one');
    }
    const salt = await bcrypt.genSalt();
    const savedPassword: string = (
      await bcrypt.hash(payload.password, salt)
    ).toString();
    const toBeSaved = {
      username: payload.username,
      email: payload.email,
      firstname: payload.firstname,
      lastname: payload.lastname,
      password: savedPassword,
    };

    const user: UserEntity = await this.userRepo.createUser(toBeSaved);
    return await this.createJWT(user);
  }

  public async login(payload: LoginDto): Promise<AuthenticationResponseDto> {
    const { username, password } = payload;
    const user: UserEntity = await this.userRepo.getUserByUsername(username);
    if (!user)
      throw new NotFoundException('username doesn t match any existing user');
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if(isAuthenticated) {
        return this.createJWT(user);
    } else throw new UnauthorizedException('the password provided is incorrect')
  }

  public async createJWT(user: UserEntity): Promise<AuthenticationResponseDto> {
    const payload: TokenPayloadDto = {
      email: user.email,
      role: user.role,
      username: user.username,
      id: user.id,
    };
    const token: string = this.jwtService.sign(payload);
    return { token } as AuthenticationResponseDto;
  }
}
