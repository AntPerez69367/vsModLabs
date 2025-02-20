import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Logger } from '@nestjs/common';

@Resolver('User')
export class UsersResolver {
  private readonly logger = new Logger(UsersResolver.name);
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  createUser(
    @Args('username') username: string,
    @Args('password') password: string,
    @Args('email') email: string,
  ) {
    return this.usersService.create(username, password, email);
  }
}
