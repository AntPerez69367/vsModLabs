import { ConfigModule as NestConfigModule } from '@nestjs/config';

const ConfigModule = NestConfigModule.forRoot({
  envFilePath: ['.env.development.local', '.env'],
});

export default ConfigModule;
