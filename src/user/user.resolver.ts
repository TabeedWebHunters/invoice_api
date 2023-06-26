import { Resolver,  Args,Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

 
  findOne(@Args('email', { type: () => String }) email: string) {
    return this.userService.findOne(email);
  }
  
  register(
    @Args('firstName', { type: () => String }) firstName: string,
    @Args('lastName', { type: () => String }) lastName: string,
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
    @Args('role', { type: () => String }) role: string,
  ) {
    return this.userService.registerUser(firstName, lastName, email, password, role);
  }

  @Mutation(() => Boolean)
  deleteUserByEmail(@Args('email', { type: () => String }) email: string): Promise<boolean> {
    return this.userService.deleteUserByEmail(email);
  }

}
