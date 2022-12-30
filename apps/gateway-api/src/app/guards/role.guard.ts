import { UserDto } from "@barber-shop/data-transfer-objects";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RoleAuthGuard implements CanActivate{
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const user: UserDto = context.switchToHttp().getRequest().user;
        const role = user.role;
        const methodRoles: string[] = this.reflector.get(
            'role',
            context.getHandler()
        )
        return methodRoles.includes(role);
    }
}