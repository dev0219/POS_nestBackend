"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = void 0;
const common_1 = require("@nestjs/common");
const remote_storage_1 = require("../../../remote-storage/src");
const cache_service_1 = require("../cache.service");
let CatalogService = class CatalogService {
    constructor(cacheService, remoteStorageService) {
        this.cacheService = cacheService;
        this.remoteStorageService = remoteStorageService;
    }
    async getCatalogLink(catalogKey, versionRequested, createCatalogFn) {
        const bucket = await this.cacheService.getCatalogsBucket();
        const keyBucket = `catalog.${catalogKey}`;
        let currentVersion = await bucket.get(keyBucket);
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
            const zipFile = await this.remoteStorageService.createZipFile(dataToStore, `${catalogKey}.json`);
            await this.remoteStorageService.saveFile(pathCatalog, zipFile, 'Catalogs');
            currentVersion.inRepo = true;
            await bucket.save(keyBucket, currentVersion);
        }
        const link = await this.remoteStorageService.getLink(pathCatalog);
        return { key: catalogKey, version: currentVersion.version, link };
    }
};
CatalogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cache_service_1.CacheService,
        remote_storage_1.RemoteStorageService])
], CatalogService);
exports.CatalogService = CatalogService;
//# sourceMappingURL=catalog.service.js.map