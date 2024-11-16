import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../entity-modules/user/user.service';
import { RefreshTokenService } from '../entity-modules/refresh-token/refresh-token.service';
import { CreateUserDto } from '../entity-modules/user/dto/create-user.dto';
import { DecodedUserObjectType } from './dto';
import { generate } from 'rand-token';
import { User } from '@server/entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  async validateGoogleUser(googleUser: CreateUserDto) {
    let user = await this.userService.findByEmail(googleUser.email);

    if (!user) {
      user = await this.userService.create(googleUser);
    }

    const tokenPayload = await this.generateTokenPayload(user);

    // Generate access and refresh tokens
    const accessToken = this.signAccessToken(tokenPayload);
    const refreshToken = this.generateRefreshToken();

    const validUntil = new Date(Date.now() + 1000 * 60 * 60 * 24 * 360);

    // Save the refresh token in the database
    await this.refreshTokenService.save({
      id: refreshToken,
      userId: user.id,
      validSince: new Date(),
      validUntil,
    });

    console.log(
      `AuthService.validateGoogleUser: generated accessToken & refreshToken: accessToken: ${accessToken}, refreshToken: ${refreshToken}`
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  generateRefreshToken(): string {
    return generate(16);
  }

  // TODO: the current type for DecodedUserObjectType is:
  //   public client_id!: string;
  //   public given_name!: string;
  //   public family_name!: string;
  //   public email!: string;
  //   public scope!: ScopeObjectType;
  //   However, JWT probably required SUB field (AuthJwtPayload class from from auth.jwt.payload.ts
  //   export class AuthJwtPayload {
  //     @IsString()
  //     sub!: string;
  //   }
  //   So, that's why I have a question, whether or not I need to change something here.
  signAccessToken(payload: DecodedUserObjectType): string {
    return this.jwtService.sign(payload);
  }

  async generateTokenPayload({ id }: Pick<User, 'id'>): Promise<DecodedUserObjectType> {
    const user = await this.userService.findOne({ id });
    if (!user) {
      throw new InternalServerErrorException('User not found');
    }

    const { id: client_id, email, firstName: given_name, lastName: family_name, googleId } = user;

    return {
      client_id,
      given_name,
      family_name,
      email,
      scope: {
        googleId,
      },
    };
  }

  async reissueAccessToken(refreshToken: string): Promise<DecodedUserObjectType | null> {
    const existingRefreshToken = await this.refreshTokenService.getNonExpiredTokenByIdWithUser(refreshToken);
    if (!existingRefreshToken) {
      return null;
    }
    const userId = existingRefreshToken.user.id;
    return this.generateTokenPayload({ id: userId });
  }

  async updateRefreshTokenLastUsed(id: string): Promise<void> {
    await this.refreshTokenService.update(id, { lastUsed: new Date() });
  }
}
