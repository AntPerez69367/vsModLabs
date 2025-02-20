import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('login')
  login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.authService.login(username, password);
  }
}
