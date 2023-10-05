"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheModule = void 0;
const common_1 = require("@nestjs/common");
const remote_storage_1 = require("../../remote-storage/src");
const cache_service_1 = require("./cache.service");
const catalog_service_1 = require("./catalog/catalog.service");
let CacheModule = class CacheModule {
};
CacheModule = __decorate([
    (0, common_1.Module)({
        imports: [remote_storage_1.RemoteStorageModule],
        providers: [cache_service_1.CacheService, catalog_service_1.CatalogService],
        exports: [cache_service_1.CacheService, catalog_service_1.CatalogService],
    })
], CacheModule);
exports.CacheModule = CacheModule;
//# sourceMappingURL=cache.module.js.map