import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  ForbiddenException,
  Inject,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
import { AuthService } from './auth.service';
import { appConfig } from '../config/app.config';
import { ConfigType } from '@nestjs/config';
import { User } from '@server/entities';
import { Request, Response } from 'express';
import { UrlResponseDto } from './dto';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token/refresh-token.guard';
import { tryCatch } from '@server/common/utils';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>
  ) {}

  @Public()
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Initiate Google OAuth2 login flow' })
  @ApiResponse({
    status: 302,
    description: 'Redirects to Google OAuth2 login page',
    type: UrlResponseDto,
  })
  async googleAuth() {}

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google OAuth2 callback' })
  @ApiResponse({
    status: 302,
    description: 'Redirects to frontend after successful authentication',
  })
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const userPayload = req['user'] as {
      user: User;
      accessToken: string;
      refreshToken: string;
    };

    if (!userPayload) {
      throw new ForbiddenException('No user from Google');
    }

    const { accessToken, refreshToken } = userPayload;

    res.cookie('accessToken', accessToken, this.appConfiguration.cookieOptions);
    res.cookie(
      'refreshToken',
      refreshToken,
      this.appConfiguration.cookieOptions
    );

    res.redirect(this.appConfiguration.frontendUrl);
  }

  @Public()
  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ summary: 'Refresh access token' })
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies.refreshToken;

    const [newAccessToken, accessTokenError] = await tryCatch(
      this.authService.reissueAccessToken(refreshToken)
    );

    if (accessTokenError || !newAccessToken) {
      this.logger.warn(
        `Failed to refresh token: ${accessTokenError?.message ?? 'Invalid token'}`
      );

      res.clearCookie('accessToken', this.appConfiguration.cookieOptions);
      res.clearCookie('refreshToken', this.appConfiguration.cookieOptions);

      const [, blacklistError] = await tryCatch(
        this.authService.invalidateTokens(refreshToken)
      );

      if (blacklistError) {
        this.logger.error(
          `Failed to blacklist token: ${blacklistError.message}`
        );
      }

      throw new ForbiddenException('Invalid refresh token');
    }

    res.cookie(
      'accessToken',
      newAccessToken,
      this.appConfiguration.cookieOptions
    );

    return res.send({ accessToken: newAccessToken });
  }
}
