import { Module } from '@nestjs/common';
import { RemoteStorageModule } from '@wecon/remote-storage';
import { CacheService } from './cache.service';
import { CatalogService } from './catalog/catalog.service';

@Module({
  imports: [RemoteStorageModule],
  providers: [CacheService, CatalogService],
  exports: [CacheService, CatalogService],
})
export class CacheModule {}
