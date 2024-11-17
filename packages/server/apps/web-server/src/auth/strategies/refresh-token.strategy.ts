import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { ConfigType } from '@nestjs/config';
import { refreshJwtConfig } from '../config/refresh-jwt.config';
import { ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private authService: AuthService,
    @Inject(refreshJwtConfig.KEY)
    private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.refreshToken || null]),
      secretOrKey: refreshJwtConfiguration.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return user;
  }
}
