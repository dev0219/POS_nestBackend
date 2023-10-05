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
exports.CatalogsBadRequestError = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
class CatalogsBadRequestError {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The error message.',
        example: ['catalogs.0.version should not be empty'],
    }),
    __metadata("design:type", Array)
], CatalogsBadRequestError.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The error status.',
        example: common_1.HttpStatus.BAD_REQUEST,
    }),
    __metadata("design:type", Number)
], CatalogsBadRequestError.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description of the status code',
        example: 'Bad Request',
    }),
    __metadata("design:type", String)
], CatalogsBadRequestError.prototype, "error", void 0);
exports.CatalogsBadRequestError = CatalogsBadRequestError;
//# sourceMappingURL=CatalogsBadRequestError.js.map