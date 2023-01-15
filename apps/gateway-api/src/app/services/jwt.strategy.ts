import { TokenPayloadDto, UserDto } from "@barber-shop/data-transfer-objects";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(
        @Inject('AUTH_MICRO') private readonly client: ClientProxy,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: TokenPayloadDto) {
        return new Promise(resolve => {
            const pattern = { cmd: 'GET_ACCOUNT' }
            let user: UserDto; 
            this.client.send(pattern, {id: payload.id}).subscribe({
                next: (data: UserDto) => {
                    user = { ...data };
                    resolve(user);
                }, 
                error: (error) => {
                    console.log(error);
                }
            })
        })
    }
}