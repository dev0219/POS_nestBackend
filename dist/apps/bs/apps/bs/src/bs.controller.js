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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BsController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const typeorm_1 = require("@nestjs/typeorm");
const model_1 = require("../../../libs/domain/src/bs/model");
const typeorm_2 = require("typeorm");
const cache_1 = require("../../../libs/cache/src");
const commands_1 = require("../../../libs/domain/src/bs/commands");
const commands_2 = require("../../../libs/domain/src/shared/commands");
const model_2 = require("../../../libs/domain/src/bs/model");
const requests_1 = require("../../../libs/domain/src/bs/requests");
let BsController = class BsController {
    constructor(businessRepository, businessSuggestedTypeRepository, businessTypeRepository, businessCategoryRepository, businessTypeProductCategoryRepository, businessProductRepository, catalogService) {
        this.businessRepository = businessRepository;
        this.businessSuggestedTypeRepository = businessSuggestedTypeRepository;
        this.businessTypeRepository = businessTypeRepository;
        this.businessCategoryRepository = businessCategoryRepository;
        this.businessTypeProductCategoryRepository = businessTypeProductCategoryRepository;
        this.businessProductRepository = businessProductRepository;
        this.catalogService = catalogService;
    }
    async createBusiness(data) {
        try {
            return await this.businessRepository.save(this.businessRepository.create(data));
        }
        catch (err) {
            const errorMessages = {
                '23503': {
                    status: 'db',
                    message: `Unknown business type ${data.business_type}`,
                    code: 'uknown_business_type',
                },
                '23505': {
                    status: 'db',
                    message: `Business already exists with the address ${data.address}`,
                    code: 'business_already_exists',
                },
                '22P02': {
                    status: 'db',
                    message: 'Some fields are missed or invalid, please check your data',
                    code: 'invalid_data',
                },
            };
            if (err.code in errorMessages) {
                throw new microservices_1.RpcException({
                    status: errorMessages[err.code].status,
                    message: errorMessages[err.code].message,
                    code: errorMessages[err.code].code,
                });
            }
            throw err;
        }
    }
    async getBusinessById(id) {
        try {
            const business = await this.businessRepository.findOneBy({ id: id });
            if (!business) {
                throw new microservices_1.RpcException({
                    status: 'db',
                    message: `Business with id not found`,
                    code: 'data_not_found',
                });
            }
            return business;
        }
        catch (err) {
            const errorMessages = {
                '22P02': { status: 'db', message: 'Invalid id', code: 'invalid_data' },
            };
            if (err.code in errorMessages) {
                throw new microservices_1.RpcException({
                    status: errorMessages[err.code].status,
                    message: errorMessages[err.code].message,
                    code: errorMessages[err.code].code,
                });
            }
            throw err;
        }
    }
    async createSuggestedType(data) {
        try {
            return await this.businessSuggestedTypeRepository.save(this.businessSuggestedTypeRepository.create(data));
        }
        catch (err) {
            const errorMessages = {
                '23505': {
                    status: 'db',
                    message: 'Business address already exists',
                    code: 'business_already_exists',
                },
            };
            if (err.code in errorMessages) {
                throw new microservices_1.RpcException({
                    status: errorMessages[err.code].status,
                    message: errorMessages[err.code].message,
                    code: errorMessages[err.code].code,
                });
            }
            throw err;
        }
    }
    async getCatalogueBasics(data) {
        const linkCatalog = this.catalogService.getCatalogLink('basics', data.version, async () => {
            const data = await Promise.all([
                this.businessTypeRepository.find({
                    select: { id: true, name: true, business_category_id: true },
                }),
                this.businessCategoryRepository.find({
                    select: { id: true, name: true },
                }),
            ]);
            return {
                businessTypes: data[0],
                businessCategories: data[1],
            };
        });
        return linkCatalog;
    }
    async getProductsCategoriesByBusinessId(businessId) {
        try {
            const business = await this.businessRepository.findBy({
                id: businessId,
            });
            if (!business[0]) {
                throw new microservices_1.RpcException({
                    status: 'db',
                    message: `Business with id not found`,
                    code: 'data_not_found',
                });
            }
            const productCategories = await this.businessTypeProductCategoryRepository.find({
                where: {
                    business_type_id: business[0].business_type_id,
                },
                select: {
                    product_category_id: true,
                },
            });
            if (!productCategories.length) {
                throw new microservices_1.RpcException({
                    status: 'db',
                    message: `There are no categories for this business type`,
                    code: 'data_not_found',
                });
            }
            return productCategories.map((element) => element.product_category_id);
        }
        catch (err) {
            const errorMessages = {
                '22P02': { status: 'db', message: 'Invalid id', code: 'invalid_data' },
            };
            if (err.code in errorMessages) {
                throw new microservices_1.RpcException({
                    status: errorMessages[err.code].status,
                    message: errorMessages[err.code].message,
                    code: errorMessages[err.code].code,
                });
            }
            throw err;
        }
    }
    async loadProductsForBusiness(data) {
        try {
            const products = [];
            for (const product of data.products_data.products) {
                const businessProduct = await this.businessProductRepository.findBy({
                    business_id: data.businessId,
                    product_id: product,
                });
                if (!businessProduct[0]) {
                    products.push(await this.businessProductRepository.save(this.businessProductRepository.create({
                        business_id: data.businessId,
                        product_id: product,
                    })));
                }
            }
            return products;
        }
        catch (err) {
            const errorMessages = {
                '22P02': { status: 'db', message: 'Invalid id', code: 'invalid_data' },
            };
            if (err.code in errorMessages) {
                throw new microservices_1.RpcException({
                    status: errorMessages[err.code].status,
                    message: errorMessages[err.code].message,
                    code: errorMessages[err.code].code,
                });
            }
            throw err;
        }
    }
};
__decorate([
    (0, microservices_1.MessagePattern)(commands_1.QueueEnum.createBusiness),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.CreateBusinessRequest]),
    __metadata("design:returntype", Promise)
], BsController.prototype, "createBusiness", null);
__decorate([
    (0, microservices_1.MessagePattern)(commands_1.QueueEnum.getBusiness),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BsController.prototype, "getBusinessById", null);
__decorate([
    (0, microservices_1.MessagePattern)(commands_1.QueueEnum.createSuggestedType),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.BusinessSuggestedTypeRequest]),
    __metadata("design:returntype", Promise)
], BsController.prototype, "createSuggestedType", null);
__decorate([
    (0, microservices_1.MessagePattern)(commands_2.QueueEnum.getCatalogbasics),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BsController.prototype, "getCatalogueBasics", null);
__decorate([
    (0, microservices_1.MessagePattern)(commands_1.QueueEnum.getCategoriesByBusiness),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BsController.prototype, "getProductsCategoriesByBusinessId", null);
__decorate([
    (0, microservices_1.MessagePattern)(commands_1.QueueEnum.loadProductsForBusiness),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BsController.prototype, "loadProductsForBusiness", null);
BsController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, typeorm_1.InjectRepository)(model_1.Business)),
    __param(1, (0, typeorm_1.InjectRepository)(model_2.BusinessTypeSuggested)),
    __param(2, (0, typeorm_1.InjectRepository)(model_1.BusinessType)),
    __param(3, (0, typeorm_1.InjectRepository)(model_2.BusinessCategory)),
    __param(4, (0, typeorm_1.InjectRepository)(model_2.BusinessTypeProductCategory)),
    __param(5, (0, typeorm_1.InjectRepository)(model_2.BusinessProduct)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        cache_1.CatalogService])
], BsController);
exports.BsController = BsController;
//# sourceMappingURL=bs.controller.js.map