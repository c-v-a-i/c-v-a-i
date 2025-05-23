import {
  Injectable,
  Inject,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../entity-modules/user/user.service';
import { RefreshTokenService } from '../entity-modules/refresh-token/refresh-token.service';
import { CreateUserDto } from '../entity-modules/user/dto/create-user.dto';
import { User } from '@server/entities';
import { ConfigType } from '@nestjs/config';
import { refreshJwtConfig } from './config/refresh-jwt.config';
import { JwtPayload } from './types';
import { Request } from 'express';
import { tryCatch } from '@server/common/utils';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshJwtConfiguration: ConfigType<
      typeof refreshJwtConfig
    >
  ) {}

  async validateGoogleUser(googleUser: CreateUserDto) {
    let user = await this.userService.findByEmail(googleUser.email);

    if (!user) {
      user = await this.userService.create(googleUser);
    }

    const payload = await this.generateTokenPayload(user);

    const accessToken = this.signAccessToken(payload);

    const refreshToken = this.signRefreshToken(payload);

    await this.refreshTokenService.save({
      token: refreshToken,
      userId: user.id,
      validSince: new Date(),
      validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90), // 90 days
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  signAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  signRefreshToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.refreshJwtConfiguration.secret,
      expiresIn: this.refreshJwtConfiguration.signOptions?.expiresIn ?? '90d',
    });
  }

  async generateTokenPayload(user: User): Promise<JwtPayload> {
    return {
      sub: user.id.toString(),
      email: user.email,
    };
  }

  async validateUserById(userId: string): Promise<User | null> {
    return this.userService.findOneBy({ id: userId });
  }

  async reissueAccessToken(refreshToken: string): Promise<string | null> {
    const existingRefreshToken =
      await this.refreshTokenService.getValidTokenWithUser(refreshToken);
    if (!existingRefreshToken) {
      return null;
    }
    const user = existingRefreshToken.user;
    const payload = await this.generateTokenPayload(user);

    await this.updateRefreshTokenLastUsed(refreshToken);

    return this.signAccessToken(payload);
  }

  async updateRefreshTokenLastUsed(token: string): Promise<void> {
    await this.refreshTokenService.update(token, { lastUsed: new Date() });
  }

  async reauthenticateWithRefreshToken(
    req: Request,
    refreshToken: string
  ): Promise<JwtPayload> {
    const existingRefreshToken =
      await this.refreshTokenService.getValidTokenWithUser(refreshToken);

    if (!existingRefreshToken) {
      this.logger.warn(`Invalid or expired refresh token: ${refreshToken}`);
      req.res?.clearCookie('refreshToken');
      req.res?.clearCookie('accessToken');
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = existingRefreshToken.user;
    const payload = await this.generateTokenPayload(user);

    const newAccessToken = this.signAccessToken(payload);
    await this.updateRefreshTokenLastUsed(refreshToken);

    req.res?.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    this.logger.log(`Reissued access token for user: ${user.id}`);
    return payload;
  }

  async invalidateTokens(refreshToken: string): Promise<void> {
    if (!refreshToken) {
      return;
    }

    const [, error] = await tryCatch(
      this.refreshTokenService.blacklistToken(refreshToken)
    );
    if (error) {
      this.logger.error(`Failed to blacklist refresh token: ${error.message}`);
      return;
    }
    this.logger.debug(`Refresh token blacklisted: ${refreshToken}`);
  }
}
