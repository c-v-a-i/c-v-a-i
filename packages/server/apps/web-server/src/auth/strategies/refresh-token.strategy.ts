import { refreshJwtConfig } from '../config/refresh-jwt.config';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>
    // private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => request?.cookies.refreshToken]),
      secretOrKey: refreshJwtConfiguration.secret,
      passReqToCallback: true,
    });
  }

  // TODO: do we need to implement this?
  // Where would it be triggered?
  // isn't having it extending PassportStrategy(Strategy, 'refresh-jwt') gonna be enough?

  // async validate(req: Request, _payload: object) {
  //   const refreshToken = req.cookies.refreshToken;
  //   const user = await this.authService.validateRefreshToken(refreshToken);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }
}
