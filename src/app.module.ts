import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModsModule } from './modules/mods/mods.module';
import LocalModules from './modules';

@Module({
  imports: [...LocalModules, ModsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
