import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import UsersModule from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ResourceQueryService } from './abac/resource.service';
import ModpacksModule from '../modpacks/modpacks.module';
import { PermissionsGuard } from './guards/permissions.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ModpacksModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1 day' },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    ResourceQueryService,
    PermissionsGuard,
  ],
  exports: [ResourceQueryService, PermissionsGuard],
})
export default class AuthModule {}
