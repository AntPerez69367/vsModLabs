import ConfigModule from './config/config.module';
import DatabaseModule from './database/database.module';
import GraphQLModule from './graphql/graphql.module';

import { ModsModule } from './mods/mods.module';
import { ReleasesModule } from './releases/releases.module';

const LocalModules = [
  ConfigModule,
  DatabaseModule,
  GraphQLModule,
  ModsModule,
  ReleasesModule,
];

export default LocalModules;
