import { TypeOrmModule } from '@nestjs/typeorm';
import { ModSubscriber } from '../mods/entities/mod.subscriber';

const DatabaseModule = TypeOrmModule.forRoot({
  type: 'mariadb',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true,
  subscribers: [ModSubscriber],
});

export default DatabaseModule;
