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
exports.LoadProductsForBusinessRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
class LoadProductsForBusinessRequest {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of product Ids will be add to the bussiness',
        example: [
            '14398f60-fc01-4777-a273-a2494afcbc58',
            '942a903d-bd8c-4e0f-ac2b-e61dc4c3512a',
        ],
    }),
    __metadata("design:type", Array)
], LoadProductsForBusinessRequest.prototype, "products", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Get all the products with are related with this category to be added to the bussiness',
        example: [
            '063bb625-960c-4571-b381-89628570640b',
            '942a903d-bd8c-4e0f-ac2b-e61dc4c3512a',
        ],
    }),
    __metadata("design:type", Array)
], LoadProductsForBusinessRequest.prototype, "productCategories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Get all the products with are related with this category id and brand id to be added to the business',
        example: [
            {
                categoryId: '063bb625-960c-4571-b381-89628570640b',
                brandId: 'dbf4b3e4-8fce-43b5-85a6-4211578248fc',
            },
            {
                categoryId: '063bb625-960c-4571-b381-89628570640b',
                brandId: 'dbf4b3e4-8fce-43b5-85a6-4212578248fc',
            },
        ],
    }),
    __metadata("design:type", Array)
], LoadProductsForBusinessRequest.prototype, "productBrandCategories", void 0);
exports.LoadProductsForBusinessRequest = LoadProductsForBusinessRequest;
//# sourceMappingURL=loadProductsForBusinessRequest.js.map