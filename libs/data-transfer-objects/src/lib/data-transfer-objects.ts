export class LoginDto {
  username?: string;
  password?: string;
}

export class AuthenticationResponseDto {
  token?: string;
}

export class RegisterDto {
  username?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  repeatedPassword?: string;
}

export class TokenPayloadDto {
  username?: string;
  role?: string;
  id?: string;
  email?: string;
}