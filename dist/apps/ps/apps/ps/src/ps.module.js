"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PsModule = void 0;
const common_1 = require("@nestjs/common");
const ps_controller_1 = require("./ps.controller");
const cache_1 = require("../../../libs/cache/src");
const remote_storage_1 = require("../../../libs/remote-storage/src");
const database_module_1 = require("./database/database.module");
let PsModule = class PsModule {
};
PsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, cache_1.CacheModule, remote_storage_1.RemoteStorageModule],
        controllers: [ps_controller_1.PsController],
        providers: [],
    })
], PsModule);
exports.PsModule = PsModule;
//# sourceMappingURL=ps.module.js.map