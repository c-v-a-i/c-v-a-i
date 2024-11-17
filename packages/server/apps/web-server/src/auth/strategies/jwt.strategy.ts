import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from '../config/jwt.config';
import { ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../types';
import { DecodedUserObjectType } from '../dto';
import { Request } from 'express';

// TODO: here's a small mess with refresh-token.
//  It's not crucial rn, but ideally we wanna make this beautiful
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.accessToken || null]),
      secretOrKey: jwtConfiguration.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<DecodedUserObjectType> {
    const user = await this.authService.validateUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return {
      client_id: user.id,
      email: user.email,
      family_name: user.lastName ?? '',
      given_name: user.firstName ?? '',
      scope: {
        googleId: user.googleId,
      },
    };
  }
}
