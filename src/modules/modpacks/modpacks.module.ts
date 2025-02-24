import { Module } from '@nestjs/common';
import { ModpacksService } from './modpacks.service';
import { ModpacksResolver } from './modpacks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModpackEntity } from './entities/modpack.entity';
import { ResourceQueryService } from '../auth/abac/resource.service';

@Module({
  imports: [TypeOrmModule.forFeature([ModpackEntity])],
  providers: [ModpacksResolver, ModpacksService, ResourceQueryService],
  exports: [ModpacksService],
})
export default class ModpacksModule {}
