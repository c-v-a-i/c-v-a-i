import { GoogleAuthService } from './google-auth.service';
import { Module } from '@nestjs/common';
import { GoogleAuthController } from './google-auth.controller';
import { AuthService } from '../../auth/auth.service';
import { GoogleStrategy } from '../../auth/strategies/google.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@server/entities';
import { RefreshToken } from '@server/entities/refresh-token.entity';
import { ConfigModule } from '@nestjs/config';
import { UserService } from '../../entity-modules/user/user.service';
import { RefreshTokenService } from '../../entity-modules/refresh-token/refresh-token.service';
import { JwtService } from '@nestjs/jwt';
import { appConfig } from '../../config/app.config';
import { googleOAuthConfig } from '../../auth/config/google-oauth.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken]),
    ConfigModule.forFeature(appConfig),
    ConfigModule.forFeature(googleOAuthConfig),
  ],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, AuthService, UserService, RefreshTokenService, GoogleStrategy, JwtService],
})
export class GoogleAuthModule {}
