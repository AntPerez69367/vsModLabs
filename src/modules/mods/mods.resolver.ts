import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ModsService } from './mods.service';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { CacheService } from '../cache/cache.service';
import { ModEntity } from './entities/mod.entity';
import { CacheKey } from '@nestjs/cache-manager';

@Resolver('Mod')
export class ModsResolver {
  private readonly logger = new Logger(ModsResolver.name);
  constructor(
    private readonly cacheService: CacheService,
    private readonly modsService: ModsService,
  ) {}

  @Mutation('updateModDB')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  updateModDB() {
    return this.modsService.updateModDB();
  }

  @Query('mods')
  findAll() {
    return this.modsService.findAll();
  }

  @Query('mod')
  @CacheKey('mod')
  async findOne(@Args('id') id: number) {
    const cacheKey = `mod_${id}`;
    const cachedData = await this.cacheService.get<ModEntity>(cacheKey);
    if (cachedData) {
      this.logger.debug('Returning cached data');
      return cachedData;
    }
    const data = await this.modsService.findOne(id);
    if (data) {
      await this.cacheService.set<ModEntity>(cacheKey, data, 60 * 60 * 15);
    }
    return data;
  }
}
