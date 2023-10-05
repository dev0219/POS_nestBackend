import { Injectable } from '@nestjs/common';
import { CatalogsType } from '@wecon/domain/shared/requests';
import { LinkCatalog } from '@wecon/domain/shared/responses';
import { RemoteStorageService } from '@wecon/remote-storage';
import { CacheService } from '../cache.service';

@Injectable()
export class CatalogService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly remoteStorageService: RemoteStorageService,
  ) {}
  async getCatalogLink(
    catalogKey: CatalogsType,
    versionRequested: number,
    createCatalogFn: () => Promise<{ [key: string]: object[] }>,
  ): Promise<LinkCatalog> {
    const bucket = await this.cacheService.getCatalogsBucket();
    const keyBucket = `catalog.${catalogKey}`;
    //const message = 'You have the latest version of the catalogue';

    let currentVersion = await bucket.get<{ version: number; inRepo: boolean }>(
      keyBucket,
    );

    if (!currentVersion) {
      currentVersion = { version: 0, inRepo: false };
    }

    if (currentVersion.version === versionRequested) {
      return {
        key: catalogKey,
        version: currentVersion.version,
        link: '',
        message: 'You have the latest version of the catalogue',
      };
    }

    const pathCatalog = `catalogs/${catalogKey}.zip`;
    if (!currentVersion.inRepo) {
      const dataToStore = await createCatalogFn();
      const zipFile = await this.remoteStorageService.createZipFile(
        dataToStore,
        `${catalogKey}.json`,
      );

      await this.remoteStorageService.saveFile(
        pathCatalog,
        zipFile,
        'Catalogs',
      );

      currentVersion.inRepo = true;

      await bucket.save(keyBucket, currentVersion);
    }

    const link = await this.remoteStorageService.getLink(pathCatalog);

    return { key: catalogKey, version: currentVersion.version, link };
  }
}
