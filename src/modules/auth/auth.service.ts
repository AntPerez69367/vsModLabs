import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthenticatedUser } from './model/AuthenticatedUser.model';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, pass: string): Promise<AuthenticatedUser> {
    return await this.validateUser(username, pass);
  }

  async validateUser(
    username: string,
    pass: string,
  ): Promise<AuthenticatedUser> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) throw new UnauthorizedException();
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const authenticatedUser = plainToInstance(AuthenticatedUser, user);
    const payload = {
      sub: authenticatedUser.id,
      username: authenticatedUser.username,
    };

    authenticatedUser.token = await this.jwtService.signAsync(payload);

    return authenticatedUser;
  }
}
