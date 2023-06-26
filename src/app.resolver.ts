import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { AuthGuard } from './auth/auth.guard';
import { User } from './user/entities/user.entity';
import { UserService } from './user/user.service';
import * as jwt from "jsonwebtoken";

@Resolver(of => String)
export class AppResolver {
constructor(private readonly userService: UserService){}
    @Query(returns =>  String)
    index(): String {
        return 'NestJs is up and running';
    }

    @Query(returns =>  String)
    @UseGuards(AuthGuard)
    login(@Args({name: "email", type:()=> String}) email: string,
    @Args({name: "password", type:()=> String}) password: string,
    @Context("user") user:User
    ): string {
        let payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }

        return jwt.sign(payload,  "key", {expiresIn: "60s"});
    }

    @Mutation(returns => String)
    async signup(
      @Args({ name: "firstName", type: () => String }) firstName: string,
      @Args({ name: "lastName", type: () => String }) lastName: string,
      @Args({ name: "email", type: () => String }) email: string,
      @Args({ name: "password", type: () => String }) password: string,
      @Args({ name: "role", type: () => String }) role: string
    ): Promise<string> {
        const data =  await this.userService.registerUser(firstName, lastName, email, password, role);

        return 'User registered successfully' + JSON.stringify(data);
    }
}