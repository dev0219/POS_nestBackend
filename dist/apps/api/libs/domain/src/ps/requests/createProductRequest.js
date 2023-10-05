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
exports.CreateProductRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateProductRequest {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Nombre del produto' }),
    __metadata("design:type", String)
], CreateProductRequest.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true, example: '1234567890' }),
    __metadata("design:type", String)
], CreateProductRequest.prototype, "barcode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true, example: 'Nombre corto del produto' }),
    __metadata("design:type", String)
], CreateProductRequest.prototype, "short_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true, example: '' }),
    __metadata("design:type", Number)
], CreateProductRequest.prototype, "measure", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true, example: 'ebf7d7b3-01b6-4e70-aca2-a5a438d20dfb' }),
    __metadata("design:type", String)
], CreateProductRequest.prototype, "product_type_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true, example: 'ebf7d7b3-01b6-4e70-aca2-a5a438d20dfb' }),
    __metadata("design:type", String)
], CreateProductRequest.prototype, "product_brand_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: true }),
    __metadata("design:type", Object)
], CreateProductRequest.prototype, "photo", void 0);
exports.CreateProductRequest = CreateProductRequest;
//# sourceMappingURL=createProductRequest.js.map