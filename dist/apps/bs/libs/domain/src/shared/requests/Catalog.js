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
exports.Catalog = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class Catalog {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(['basics', 'clients', 'productcategories']),
    __metadata("design:type", String)
], Catalog.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], Catalog.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Business ID',
        example: '901b3a4b-4ea6-4fab-a328-f72fc4010cec',
        required: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The businessId field is required.' }),
    (0, class_validator_1.IsString)({ message: 'The businessId field is invalid.' }),
    (0, class_validator_1.IsUUID)('all', { message: 'The businessId field has an invalid format' }),
    __metadata("design:type", String)
], Catalog.prototype, "businessId", void 0);
exports.Catalog = Catalog;
//# sourceMappingURL=Catalog.js.map