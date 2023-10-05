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
exports.CacheService = void 0;
const common_1 = require("@nestjs/common");
const nats_1 = require("nats");
class JetStreamBucket {
    constructor(bucket, stringCodec) {
        this.bucket = bucket;
        this.stringCodec = stringCodec;
    }
    async save(key, value) {
        try {
            await this.bucket.put(key, this.stringCodec.encode(JSON.stringify(value)));
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async get(key) {
        var _a;
        const value = (_a = (await this.bucket.get(key))) === null || _a === void 0 ? void 0 : _a.value;
        if (value == null)
            return null;
        return JSON.parse(this.stringCodec.decode(value));
    }
}
let CacheService = class CacheService {
    constructor() {
        this.stringCodec = (0, nats_1.StringCodec)();
        this.initConnection();
    }
    async initConnection() {
        const natsConnection = await (0, nats_1.connect)({
            servers: `nats://${process.env.NATS_SERVER}`,
        });
        this.jetStreamClient = natsConnection.jetstream();
        const err = await natsConnection.closed();
        if (err) {
            console.error(err);
            process.exit(1);
        }
    }
    async getBucket(name) {
        const bucket = await this.jetStreamClient.views.kv(name);
        return new JetStreamBucket(bucket, this.stringCodec);
    }
    getCatalogsBucket() {
        return this.getBucket(`general_catalogs`);
    }
    getUserBucket(userId) {
        return this.getBucket(`user_${userId}`);
    }
    getBusinessBucket(businessId) {
        return this.getBucket(`business_${businessId}`);
    }
};
CacheService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CacheService);
exports.CacheService = CacheService;
//# sourceMappingURL=cache.service.js.map