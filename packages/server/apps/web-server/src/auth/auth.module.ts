import { UserService } from '../entity-modules/user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { googleOAuthConfig } from './config/google-oauth.config';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@server/entities';
import { RefreshToken } from '@server/entities/refresh-token.entity';
import { refreshJwtConfig } from './config/refresh-jwt.config';
import { jwtConfig } from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenService } from '../entity-modules/refresh-token/refresh-token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken]),
    ConfigModule.forFeature(googleOAuthConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      inject: [jwtConfig.KEY],
      useFactory: (config) => ({
        secret: config.secret,
        signOptions: config.signOptions,
      }),
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    UserService,
    RefreshTokenService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
