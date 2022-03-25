import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserDocument } from 'src/user/schema/user.schema';
import { AuthService } from './auth.service';
import { CurrentUser, GQLGuard } from 'src/strategies/jwt.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(GQLGuard)
  @Query()
  me(@CurrentUser() user: UserDocument) {
    return user;
  }

  @Mutation()
  login(@Args('email') email: string, @Args('password') password: string) {
    return this.authService.login({ email, password });
  }
  @Mutation()
  signup(@Args('input') input: UserDocument) {
    return this.authService.register(input);
  }
}
