import ConfigModule from './config/config.module';
import DatabaseModule from './database/database.module';
import GraphQLModule from './graphql/graphql.module';

import { ModsModule } from './mods/mods.module';

const LocalModules = [ConfigModule, DatabaseModule, GraphQLModule, ModsModule];

export default LocalModules;
