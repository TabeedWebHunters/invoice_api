import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly userService : UserService){

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context).getContext();
        const {email, password} = ctx.req.body.variables;
        const usr : User = await this.userService.findOne(email);
        
        if(usr && usr.password == password){
            ctx.user = usr;
            return true

        }else {
            throw new HttpException("UnAuthenticated", HttpStatus.UNAUTHORIZED)
        }
    }
}