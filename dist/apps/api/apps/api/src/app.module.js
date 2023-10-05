"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.setEnvironment = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const events_1 = require("../../../libs/events/src");
const business_controller_1 = require("./presentation/controllers/business.controller");
const products_controller_1 = require("./presentation/controllers/products.controller");
const remote_storage_1 = require("../../../libs/remote-storage/src");
function setEnvironment() {
    switch (process.env.NODE_ENV) {
        case 'test':
            return ['.env.test', '.env'];
        case 'stage':
            return ['.env.stage', '.env'];
        case 'development':
            return ['.env.development', '.env'];
        case 'production':
        default:
            return ['.env'];
    }
}
exports.setEnvironment = setEnvironment;
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                expandVariables: true,
                envFilePath: setEnvironment(),
            }),
            events_1.EventsModule.register({
                connectionName: 'wecon-api',
                connectionType: events_1.EventsModuleConnectionType.COMMANDS,
            }),
            remote_storage_1.RemoteStorageModule,
        ],
        controllers: [business_controller_1.BusinessController, products_controller_1.ProductsController],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map