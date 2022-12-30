import { UserDto } from "@barber-shop/data-transfer-objects";
import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user as UserDto;
});
