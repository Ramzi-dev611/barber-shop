import { Body, Controller, Delete, Get, Param, Put, UseGuards } from "@nestjs/common";
import { AccountService } from "../services/account.service";
import { UserDto } from "@barber-shop/data-transfer-objects";
import { Observable } from "rxjs";
import { GetUser } from "../decorators/get-user.decorator";
import { AuthGuard } from "@nestjs/passport";

@Controller('account')
export class AccountController {
    constructor(private readonly service: AccountService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    public getUser(
        @GetUser() user: UserDto
    ): UserDto {
        return user;
    }

    @Put()
    @UseGuards(AuthGuard('jwt'))
    public updatteAccount(
        @Body() payload: UserDto,
        @GetUser() user: UserDto,
        // @GetUser() user: UserDto
    ) : Observable<UserDto> {
        const respose = this.service.updateProfile(
          user.id,
          payload
        );
        console.log(respose)
        return respose;
    }

    @Delete()
    @UseGuards(AuthGuard('jwt'))
    public deleteAccount(
        @GetUser() user: UserDto
    ) {
        return this.service.deleteUser(user.id);
    }
}