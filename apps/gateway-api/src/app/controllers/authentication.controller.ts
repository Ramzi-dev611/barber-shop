import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto, AuthenticationResponseDto, RegisterDto } from '@barber-shop/data-transfer-objects'
import { AuthenticationService } from "../services/authentication.service";
import { Observable } from "rxjs";


@Controller()
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}
    
    @Post('login')
    public login(@Body() payload: LoginDto): Observable<Promise<AuthenticationResponseDto>> {
        return this.authenticationService.login(payload);
    }

    @Post('register')
    public register(@Body() payload: RegisterDto): Observable<Promise<AuthenticationResponseDto>> {
        return this.authenticationService.register(payload);
    }
}