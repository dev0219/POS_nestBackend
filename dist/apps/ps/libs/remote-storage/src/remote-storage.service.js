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
exports.RemoteStorageService = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const jszip = require("jszip");
const microservices_1 = require("@nestjs/microservices");
const BucketValue = {
    Catalogs: process.env.AWS_BUCKET_CATALOGS,
    Transactions: process.env.AWS_BUCKET_TRANSACTIONS,
    'Temporal Transactions': process.env.AWS_BUCKET_TEMPORAL_TRANSACTIONS,
};
let RemoteStorageService = class RemoteStorageService {
    constructor() {
        this.s3 = new client_s3_1.S3Client({
            region: process.env.AWS_BUCKET_REGION,
            credentials: {
                accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
                secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY,
            },
        });
    }
    async saveFile(name, body, bucket) {
        try {
            const objectCmd = new client_s3_1.PutObjectCommand({
                Bucket: BucketValue[bucket],
                Key: name,
                Body: body,
            });
            const result = await this.s3.send(objectCmd);
            console.log(result);
        }
        catch (error) {
            console.error(error);
            throw new microservices_1.RpcException({
                status: 'db',
                message: 'Error to save file',
            });
        }
    }
    async getLink(path, secondsToExpire = 3600) {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_CATALOGS,
            Key: path,
        });
        return await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, {
            expiresIn: secondsToExpire,
        });
    }
    async createZipFile(data, internalFileName) {
        const jsonString = JSON.stringify(data);
        const zip = new jszip();
        const fileName = internalFileName;
        zip.file(fileName, jsonString);
        const buffer = await zip.generateAsync({ type: 'nodebuffer' });
        zip.remove(fileName);
        return buffer;
    }
    async moveFile(targetBucket, originSource, name) {
        try {
            const command = new client_s3_1.CopyObjectCommand({
                Bucket: BucketValue[targetBucket],
                CopySource: originSource,
                Key: name,
            });
            const result = await this.s3.send(command);
            console.info(result);
        }
        catch (error) {
            console.error(error);
            throw new microservices_1.RpcException({
                status: 'db',
                message: 'Error to move file',
            });
        }
    }
};
RemoteStorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RemoteStorageService);
exports.RemoteStorageService = RemoteStorageService;
//# sourceMappingURL=remote-storage.service.js.map