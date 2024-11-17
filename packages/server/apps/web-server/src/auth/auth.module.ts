import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../entity-modules/user/user.service';
import { RefreshTokenService } from '../entity-modules/refresh-token/refresh-token.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { User } from '@server/entities';
import { RefreshToken } from '@server/entities/refresh-token.entity';
import { googleOAuthConfig } from './config/google-oauth.config';
import { jwtConfig } from './config/jwt.config';
import { refreshJwtConfig } from './config/refresh-jwt.config';
import { appConfig } from '../config/app.config';
import { AuthResolver } from './auth.resolver';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken]),
    ConfigModule.forFeature(googleOAuthConfig),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    ConfigModule.forFeature(appConfig),
    PassportModule,

    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      inject: [jwtConfig.KEY],
      useFactory: (jwtConfiguration: ConfigType<typeof jwtConfig>) => ({
        secret: jwtConfiguration.secret,
        signOptions: jwtConfiguration.signOptions,
      }),
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    UserService,
    RefreshTokenService,
    JwtStrategy,
    GoogleStrategy,
    RefreshTokenStrategy,
    GoogleAuthGuard,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    Logger,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
