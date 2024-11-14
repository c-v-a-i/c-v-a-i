import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';

@Resolver()
export class AuthResolver {
  @Mutation(() => Boolean)
  public logout(@Context('req') req: Request) {
    req.res?.clearCookie('accessToken');
    req.res?.clearCookie('refreshToken');
    return true;
  }
}
