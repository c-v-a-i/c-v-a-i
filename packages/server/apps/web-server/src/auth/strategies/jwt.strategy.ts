import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from '../config/jwt.config';
import { JwtPayload } from '../types';
import { DecodedUserObjectType } from '../dto';
import { Request } from 'express';
import { tryCatch } from '@server/common/utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly authService: AuthService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.accessToken || null,
      ]),
      secretOrKey: jwtConfiguration.secret,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: JwtPayload
  ): Promise<DecodedUserObjectType> {
    const [user, userError] = await tryCatch(
      this.authService.validateUserById(payload.sub)
    );

    if (user) {
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

    if (userError) {
      this.logger.error(`Error validating token: ${userError.message}`);
    } else {
      this.logger.error(
        `AUTH ERR: couldn't find a user with a token: ${payload.sub} and email ${payload.email}`
      );
    }

    // Try to refresh the token if one exists
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('Authentication failed');
    }

    // Attempt to refresh the token
    const [refreshPayload, refreshError] = await tryCatch(
      this.authService.reauthenticateWithRefreshToken(req, refreshToken)
    );

    // If refresh failed, log and throw
    if (refreshError || !refreshPayload) {
      this.logger.error(
        `Failed to refresh token: ${refreshError?.message || 'Unknown error'}`
      );
      throw new UnauthorizedException('Authentication failed');
    }

    // Get user with the refreshed token
    const [refreshedUser, refreshedUserError] = await tryCatch(
      this.authService.validateUserById(refreshPayload.sub)
    );

    // If we got a user from the refreshed token, return it
    if (refreshedUser) {
      return {
        client_id: refreshedUser.id,
        email: refreshedUser.email,
        family_name: refreshedUser.lastName ?? '',
        given_name: refreshedUser.firstName ?? '',
        scope: {
          googleId: refreshedUser.googleId,
        },
      };
    }

    // Final error if we couldn't get a valid user
    if (refreshedUserError) {
      this.logger.error(
        `Error validating refreshed token: ${refreshedUserError.message}`
      );
    } else {
      this.logger.error(
        `AUTH ERR: couldn't find a user after refresh for sub: ${refreshPayload.sub}`
      );
    }

    throw new UnauthorizedException('Authentication failed');
  }
}
