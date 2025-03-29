import { Controller, Get, Req, Res, ForbiddenException, Inject, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
import { AuthService } from './auth.service';
import { appConfig } from '../config/app.config';
import { ConfigType } from '@nestjs/config';
import { User } from '@server/entities';
import { Request, Response } from 'express';
import { UrlResponseDto } from './dto';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
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
  @ApiResponse({ status: 302, description: 'Redirects to frontend after successful authentication' })
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

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: this.appConfiguration.isProduction,
      sameSite: 'lax',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: this.appConfiguration.isProduction,
      sameSite: 'lax',
    });

    res.redirect(this.appConfiguration.frontendUrl);
  }

  // TODO: do something with refresh function
  // @Post('refresh')
  // @UseGuards(RefreshTokenGuard)
  // @ApiOperation({ summary: 'Refresh access token' })
  // async refresh(@Req() req: Request, @Res() res: Response) {
  //   const refreshToken = req.cookies.refreshToken;
  //   const newAccessToken = await this.authService.reissueAccessToken(refreshToken);
  //
  //   if (!newAccessToken) {
  //     res.clearCookie('accessToken');
  //     res.clearCookie('refreshToken');
  //     throw new ForbiddenException('Invalid refresh token');
  //   }
  //
  //   res.cookie('accessToken', newAccessToken, {
  //     httpOnly: true,
  //     secure: this.appConfiguration.isProduction,
  //     sameSite: 'lax',
  //   });
  //
  //   res.send({ accessToken: newAccessToken });
  // }
}
