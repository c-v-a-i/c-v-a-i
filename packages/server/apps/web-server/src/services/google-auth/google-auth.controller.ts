import { Public } from '../../auth/decorators/public.decorator';
import { GoogleAuthGuard } from '../../auth/guards/google-auth/google-auth.guard';
import { GoogleAuthService } from './google-auth.service';
import { Controller, ForbiddenException, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Response, Request } from 'express';
import { appConfig } from '../../config/app.config';
import { AuthService } from '../../auth/auth.service';
import { UserGooglePayloadType } from '../../auth/types/user-google-payload.type';

@Controller('google-auth')
export class GoogleAuthController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    private readonly authService: AuthService
  ) {}

  @Public()
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    // Initiates the Google OAuth2 login flow
  }

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    if (!req.user) {
      throw new ForbiddenException('No user from google');
    }

    const { accessToken, refreshToken, user } = req.user as UserGooglePayloadType;

    console.log(
      [
        `GoogleAuthController.googleAuthRedirect:`,
        `  accessToken: ${accessToken}`,
        `  refreshToken: ${refreshToken}`,
        `  user: ${JSON.stringify(user, null, 2)}`,
      ].join('\n')
    );

    // TODO: should be moved into "login" function.
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
}
