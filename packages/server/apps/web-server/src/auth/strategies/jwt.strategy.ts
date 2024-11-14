import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { DecodedUserObjectType } from '../dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';

type JwtMeta = {
  exp: number;
  iat: number;
};

type AccessToken = DecodedUserObjectType & JwtMeta;

type RefreshTokenPayload = {
  refreshToken: string;
} & JwtMeta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isAccessToken = (payload: any): payload is AccessToken => !!payload.client_id;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        return req?.cookies?.accessToken || req?.cookies?.refreshToken;
      },
      secretOrKey: jwtConfiguration.secret,
      passReqToCallback: true,
      ignoreExpiration: true,
    });
  }

  async validate(req: Request, payload: AccessToken | RefreshTokenPayload) {
    if (isAccessToken(payload)) {
      const { exp } = payload;
      const expirationDate = new Date(exp * 1000);
      const isExpired = new Date() > expirationDate;

      if (!isExpired) {
        // Access token is valid
        return payload;
      } else {
        // Access token is expired, attempt to reissue using refresh token
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
          throw new UnauthorizedException('Refresh token not found');
        }

        return this.reauthenticateWithRefreshToken(req, refreshToken);
      }
    } else {
      // This is a refresh token
      const { refreshToken } = payload;
      return this.reauthenticateWithRefreshToken(req, refreshToken);
    }
  }

  private async reauthenticateWithRefreshToken(req: Request, refreshToken: string) {
    const accessTokenPayload = await this.authService.reissueAccessToken(refreshToken);

    if (!accessTokenPayload) {
      req.res?.clearCookie('accessToken');
      req.res?.clearCookie('refreshToken');
      throw new UnauthorizedException();
    }

    const newAccessToken = this.authService.signAccessToken(accessTokenPayload);

    await this.authService.updateRefreshTokenLastUsed(refreshToken);

    req.res?.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax', // Adjust based on your setup
    });

    return accessTokenPayload;
  }
}
