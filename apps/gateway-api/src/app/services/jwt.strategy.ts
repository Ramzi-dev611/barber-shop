import { TokenPayloadDto, UserDto } from "@barber-shop/data-transfer-objects";
import { Inject, Injectable, OnApplicationBootstrap, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) implements OnApplicationBootstrap {
    
    constructor(
        @Inject('AUTH_MICRO') private readonly client: ClientProxy,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }
    async onApplicationBootstrap() {
        await this.client.connect();
    }

    async validate(payload: TokenPayloadDto) {
        let user: UserDto;
        const pattern = { cmd: 'get'}
        this.client.send(pattern, {id: payload.id}).subscribe({
            next: (data: UserDto) => {
                user = data;
                if(!user) {
                    throw new UnauthorizedException('The token provided has an issue, reconnect to the app');
                }
                return user;
            }, 
            error: (error) => {
                console.log(error);
            }
        })
    }
}