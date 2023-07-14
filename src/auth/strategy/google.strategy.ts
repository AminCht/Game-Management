import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from "@nestjs/config";

import { Injectable } from '@nestjs/common';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(config: ConfigService) {
    super({
      clientID: config.get('CLIENT_ID'),
      clientSecret: config.get('CLIENT_SECRET'),
      callbackURL: config.get('REDIRECT_URL'),
      scope: ['email', 'profile'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: any){
    const { name, emails, photos } = profile
    const user = {
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        picture: photos[0].value,
        accessToken
      }
      
      return user;
  }
}