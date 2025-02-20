import ConfigModule from './config/config.module';
import DatabaseModule from './database/database.module';
import GraphQLModule from './graphql/graphql.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ModsModule } from './mods/mods.module';

const LocalModules = [
  ConfigModule,
  DatabaseModule,
  GraphQLModule,
  ModsModule,
  AuthModule,
  UsersModule,
];

export default LocalModules;
