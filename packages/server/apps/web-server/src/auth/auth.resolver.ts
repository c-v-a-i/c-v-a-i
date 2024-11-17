import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth/gql-auth.guard';

@UseGuards(GqlAuthGuard)
@Resolver()
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);
  constructor() {}

  @Mutation(() => Boolean)
  public logout(@Context('req') req: Request) {
    req.res?.clearCookie('accessToken');
    req.res?.clearCookie('refreshToken');
    return true;
  }
}
