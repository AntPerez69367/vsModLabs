import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { UsersService } from 'src/modules/users/users.service';
import { jwtConstants } from '../constants';
import { JwtPayload } from '../interfaces/JwtPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload) {
    try {
      const user = await this.userService.findOneById(payload.sub);
      if (!user || !payload) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
