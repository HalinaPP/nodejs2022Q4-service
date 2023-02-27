import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { authConfig } from 'src/config';
import { Token } from './dto/tokens.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.JWT_SECRET_KEY,
    });
  }

  async validate(payload: Token) {
    return { userId: payload.userId, username: payload.login };
  }
}
