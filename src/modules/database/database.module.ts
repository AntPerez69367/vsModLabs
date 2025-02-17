import { TypeOrmModule } from '@nestjs/typeorm';

const DatabaseModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true,
});

export default DatabaseModule;
