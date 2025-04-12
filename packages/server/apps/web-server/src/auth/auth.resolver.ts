import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth/gql-auth.guard';
import { AuthService } from './auth.service';
import { ConfigType } from '@nestjs/config';
import { appConfig } from '../config/app.config';

@UseGuards(GqlAuthGuard)
@Resolver()
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);

  constructor(
    private readonly authService: AuthService,
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>
  ) {}

  @Mutation(() => Boolean)
  public async logout(@Context('req') req: Request) {
    const refreshToken = req.cookies?.refreshToken;

    req.res?.clearCookie('accessToken', this.appConfiguration.cookieOptions);
    req.res?.clearCookie('refreshToken', this.appConfiguration.cookieOptions);

    if (refreshToken) {
      await this.authService.invalidateTokens(refreshToken);
    }

    this.logger.log('User logged out successfully');
    return true;
  }
}
