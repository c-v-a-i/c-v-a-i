import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { googleOAuthConfig } from '../config/google-oauth.config';
import { AuthService } from '../auth.service';
import { Profile } from 'passport-google-oauth20';
import { CreateUserDto } from '../../entity-modules/user/dto/create-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleOAuthConfig.KEY)
    private readonly googleConfig: ConfigType<typeof googleOAuthConfig>,
    private readonly authService: AuthService
  ) {
    super({
      clientID: googleConfig.clientID,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: Function
  ) {
    const { emails, name, id } = profile;

    if (!emails || emails.length === 0) {
      return done(
        new UnauthorizedException('No email associated with this account'),
        false
      );
    }

    const googleUser: CreateUserDto = {
      email: emails[0].value,
      firstName: name?.givenName,
      lastName: name?.familyName,
      googleId: id,
    };

    const user = await this.authService.validateGoogleUser(googleUser);

    done(null, user);
  }
}
