import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { googleOAuthConfig } from '../config/google-oauth.config';
import { AuthService } from '../auth.service';
import { GooglePayload } from '../payloads/google-profile-payload';

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

  async validate(_accessToken: string, _refreshToken: string, profile: GooglePayload | null, done: VerifyCallback) {
    if (!profile) {
      return done(new UnauthorizedException(), false);
    }

    const { emails, name, id } = profile;

    console.log(`GoogleStrategy.validate: accessToken: ${_accessToken}, refreshToken: ${_refreshToken}`);

    // TODO: if I understand it correctly, we need to move validateGoogleUser logic into "validate" method of GoogleStrategy.
    // How would we receive the accessToken then in this case?
    const googleValidationResult = await this.authService.validateGoogleUser({
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      googleId: id,
    });

    done(null, googleValidationResult);
  }
}
