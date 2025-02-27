import { Module } from '@nestjs/common';
import { ModsService } from './mods.service';
import { ModsResolver } from './mods.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModEntity } from './entities/mod.entity';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { ResourceQueryService } from '../auth/abac/resource.service';
import ModpacksModule from '../modpacks/modpacks.module';
import ModDetailsModule from '../moddetails/moddetails.module';
import CacheModule from '../cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ModEntity]),
    ModpacksModule,
    ModDetailsModule,
    CacheModule,
  ],
  providers: [
    ModsResolver,
    ModsService,
    ResourceQueryService,
    PermissionsGuard,
  ],
})
export default class ModsModule {}
