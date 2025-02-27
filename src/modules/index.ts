import ConfigModule from './config/config.module';
import DatabaseModule from './database/database.module';
import GraphQLModule from './graphql/graphql.module';
import AuthModule from './auth/auth.module';
import UsersModule from './users/users.module';
import ModsModule from './mods/mods.module';
import ModpacksModule from './modpacks/modpacks.module';
import ModDetailsModule from './moddetails/moddetails.module';
import ModreleaseModule from './modrelease/modrelease.module';
import CacheModule from './cache/cache.module';

const LocalModules = [
  ConfigModule,
  DatabaseModule,
  GraphQLModule,
  ModsModule,
  AuthModule,
  UsersModule,
  ModpacksModule,
  ModDetailsModule,
  ModreleaseModule,
  CacheModule,
];

export default LocalModules;
