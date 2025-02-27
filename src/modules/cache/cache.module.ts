import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { CacheService } from './cache.service';
import { CacheableMemory, Keyv } from 'cacheable';

@Module({
  imports: [
    NestCacheModule.registerAsync({
      useFactory: () => ({
        cacheId: 'mods',
        namespace: 'mods',
        refreshAllStores: true,
        stores: [
          new Keyv({
            store: new CacheableMemory({
              ttl: 60 * 15,
              lruSize: 5000,
            }),
          }),
        ],
      }),
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export default class CacheModule {}
