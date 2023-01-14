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

export class UserDto {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  role?: string;
}

export class FetchCommandPayload {
  id?: string;
}