import { Module } from '@nestjs/common';
import { ModsService } from './mods.service';
import { ModsResolver } from './mods.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModEntity } from './entities/mod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModEntity])],
  providers: [ModsResolver, ModsService],
})
export class ModsModule {}
