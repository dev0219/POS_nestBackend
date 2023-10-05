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
exports.PsController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const model_1 = require("../../../libs/domain/src/ps/model");
const microservices_1 = require("@nestjs/microservices");
const commands_1 = require("../../../libs/domain/src/ps/commands");
const requests_1 = require("../../../libs/domain/src/ps/requests");
const createProductCategoryRequest_1 = require("../../../libs/domain/src/ps/requests/createProductCategoryRequest");
const createProductBrandRequest_1 = require("../../../libs/domain/src/ps/requests/createProductBrandRequest");
const requests_2 = require("../../../libs/domain/src/shared/requests");
const cache_1 = require("../../../libs/cache/src");
const paginationReponse_1 = require("../../../libs/domain/src/shared/paginations/paginationReponse");
const createProductTypeRequest_1 = require("../../../libs/domain/src/ps/requests/createProductTypeRequest");
const updateProductTypeRequest_1 = require("../../../libs/domain/src/ps/requests/updateProductTypeRequest");
let PsController = class PsController {
    constructor(productRepository, productTypeRepository, productBrandRepository, productCategoryRepository, catalogService) {
        this.productRepository = productRepository;
        this.productTypeRepository = productTypeRepository;
        this.productBrandRepository = productBrandRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.catalogService = catalogService;
    }
    async createProduct(data) {
        try {
            return await this.productRepository.save(this.productRepository.create(data));
        }
        catch (err) {
            const errorMessages = {
                '23503': {
                    status: 'db',
                    message: `Unknown product type ${data.product_type_id}`,
                    code: 'uknown_business_type',
                },
                '23505': {
                    status: 'db',
                    message: `Product already exists with the address ${data.name}`,
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
    async getProducts(data) {
        const take = Number(data.take) || 10;
        const page = Number(data.page) || 1;
        const skip = (page - 1) * take;
        const dataArr = await this.productRepository.findAndCount({
            select: {
                product_types: {
                    name: true,
                    id: true,
                },
                product_brand: {
                    name: true,
                },
            },
            relations: {
                product_types: true,
                product_brand: true,
            },
            where: Object.assign(Object.assign(Object.assign({}, (data.text && {
                name: (0, typeorm_2.Like)(`%${data.text}%`),
            })), (data.categoryId && {
                product_types: { product_category: { id: data.categoryId } },
            })), (data.brandId && { product_brand: { id: data.brandId } })),
            take: take,
            skip: skip
        });
        const fileteredData = (0, paginationReponse_1.paginateResponse)(dataArr, page, take);
        return fileteredData;
    }
    async getProductDetail(productId) {
        try {
            const product = await this.productRepository.findOne({
                where: {
                    id: productId,
                },
            });
            if (!product) {
                throw new microservices_1.RpcException({
                    status: 'db',
                    message: `Product with id not found`,
                    code: 'data_not_found',
                });
            }
            return product;
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
    async createProductBrand(data) {
        try {
            return await this.productBrandRepository.save(this.productBrandRepository.create(data));
        }
        catch (err) {
            const errorMessages = {
                '23505': {
                    status: 'db',
                    message: `Product brand already exists with the address ${data.name}`,
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
    async getCategoryWithBrands(categoryId) {
        try {
            const category = await this.productCategoryRepository.findOne({
                where: {
                    id: categoryId,
                },
                select: {
                    product_brands: {
                        id: true,
                        name: true,
                    },
                },
                relations: {
                    product_brands: true,
                },
            });
            if (!category) {
                throw new microservices_1.RpcException({
                    status: 'db',
                    message: `Category with id not found`,
                    code: 'data_not_found',
                });
            }
            return category;
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
    async getBrandWithCategories(brandId) {
        console.log(brandId);
        try {
            const brand = await this.productBrandRepository.findOne({
                where: {
                    id: brandId,
                },
                select: {
                    product_categories: {
                        id: true,
                        name: true,
                    },
                },
                relations: {
                    product_categories: true,
                },
            });
            if (!brand) {
                throw new microservices_1.RpcException({
                    status: 'db',
                    message: `Brand with id not found`,
                    code: 'data_not_found',
                });
            }
            return brand;
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
    async createProductCategory(data) {
        try {
            return await this.productCategoryRepository.save(this.productCategoryRepository.create(data));
        }
        catch (err) {
            const errorMessages = {
                '23505': {
                    status: 'db',
                    message: `Product category already exists with the address ${data.name}`,
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
    async getCategories() {
        try {
            const categories = await this.productCategoryRepository.find();
            return categories;
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
    async getCatalogs(data) {
        const { key, version } = data;
        const linkCatalog = this.catalogService.getCatalogLink(key, version, async () => {
            const results = await Promise.all([
                this.productCategoryRepository.find({
                    relations: { product_brands: true },
                    select: {
                        id: true,
                        name: true,
                        product_brands: { id: true },
                    },
                }),
                this.productBrandRepository.find({
                    relations: { product_categories: true },
                    select: {
                        id: true,
                        name: true,
                        product_categories: { id: true },
                    },
                }),
                this.productTypeRepository.find({
                    select: {
                        id: true,
                        name: true,
                        product_category_id: true,
                    },
                }),
            ]);
            return {
                productCategories: results[0],
                productBrands: results[1],
                productTypes: results[2],
            };
        });
        return linkCatalog;
    }
    async createProductType(data) {
        try {
            return await this.productTypeRepository.save(this.productTypeRepository.create(data));
        }
        catch (err) {
            const errorMessages = {
                '23505': {
                    status: 'db',
                    message: `Product type already exists with the name ${data.name}`,
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
    async getProductTypes(data) {
        const take = Number(data.take) || 10;
        const page = Number(data.page) || 1;
        const skip = (page - 1) * take;
        const dataArr = await this.productTypeRepository.findAndCount({
            where: Object.assign({}, (data.name && {
                name: (0, typeorm_2.Like)(`%${data.name}%`),
            })),
            take: take,
            skip: skip
        });
        const fileteredData = (0, paginationReponse_1.paginateResponse)(dataArr, page, take);
        return fileteredData;
    }
    async getProductTypeDetail(productTypeId) {
        try {
            const product_type = await this.productTypeRepository.findOne({
                where: {
                    id: productTypeId,
                },
            });
            if (!product_type) {
                throw new microservices_1.RpcException({
                    status: 'db',
                    message: `Product type with id not found`,
                    code: 'data_not_found',
                });
            }
            return product_type;
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
    async updateProductDetail(data) {
        try {
            const productType = await this.productTypeRepository.findOne({
                where: {
                    id: data.productTypeId,
                },
            });
            if (!productType) {
                throw new microservices_1.RpcException({
                    status: 'db',
                    message: `Product Type with id not found`,
                    code: 'data_not_found',
                });
            }
            await this.productTypeRepository.update(data.productTypeId, Object.assign({}, data.productType.name && { name: data.productType.name }));
            let res = { statusCode: 'Updated a Product type sucessufully!', updatedId: data.productTypeId };
            return res;
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
    async delProductType(productTypeId) {
        try {
            const product = await this.productTypeRepository.findOne({
                where: {
                    id: productTypeId,
                },
            });
            if (!product) {
                throw new microservices_1.RpcException({
                    status: 'db',
                    message: `Product Type with id not found`,
                    code: 'data_not_found',
                });
            }
            await this.productTypeRepository.delete(productTypeId);
            let res = { statusCode: "Product type was deleted!", deletedId: productTypeId };
            return res;
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
    (0, microservices_1.MessagePattern)(commands_1.QueueEnum.createProduct),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.CreateProductRequest]),
    __metadata("design:returntype", Promise)
], PsController.prototype, "createProduct", null);
__decorate([
    (0, microservices_1.MessagePattern)(commands_1.QueueEnum.getProducts),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PsController.prototype, "getProducts", null);
__decorate([
    (0, microservices_1.MessagePattern)(commands_1.QueueEnum.getProductDetail),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PsController.prototype, "getProductDetail", null);
__decorate([
    (0, microservices_1.MessagePattern)(commands_1.QueueEnum.createProductBrand),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProductBrandRequest_1.CreateProductBrandRequest]),
    __metadata("design:returntype", Promise)
], PsController.prototype, "createProductBrand", null);
__decorate([
    (0, microservices_1.MessagePattern)(commands_1.QueueEnum.getCategory),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PsController.prototype, "getCategoryWithBrands", null);
__decorate([
    (0, microservices_1.MessagePattern)(commands_1.QueueEnum.getBrand),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PsController.prototype, "getBrandWithCategories", null);
__decorate([
    (0, microservices_1.MessagePattern)(commands_1.QueueEnum.createProductCategory),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProductCategoryRequest_1.CreateProductCategoryRequest]),
    __metadata("design:returntype", Promise)
], PsController.prototype, "createProductCategory", null);
__decorate([
    (0, microservices_1.MessagePattern)(commands_1.QueueEnum.getCategories),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PsController.prototype, "getCategories", null);
__decorate([
    (0, microservices_1.MessagePattern)(commands_1.QueueEnum.getProductCatalogs),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_2.Catalog]),
    __metadata("design:returntype", Promise)
], PsController.prototype, "getCatalogs", null);
__decorate([
    (0, microservices_1.MessagePattern)(commands_1.QueueEnum.createProductType),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProductTypeRequest_1.CreateProductTypeRequest]),
    __metadata("design:returntype", Promise)
], PsController.prototype, "createProductType", null);
__decorate([
    (0, microservices_1.MessagePattern)(commands_1.QueueEnum.getProductTypes),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PsController.prototype, "getProductTypes", null);
__decorate([
    (0, microservices_1.MessagePattern)(commands_1.QueueEnum.getProductTypeDetail),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PsController.prototype, "getProductTypeDetail", null);
__decorate([
    (0, microservices_1.MessagePattern)(commands_1.QueueEnum.updateProductType),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateProductTypeRequest_1.UpdateProductTypeRequest]),
    __metadata("design:returntype", Promise)
], PsController.prototype, "updateProductDetail", null);
__decorate([
    (0, microservices_1.MessagePattern)(commands_1.QueueEnum.delProductType),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PsController.prototype, "delProductType", null);
PsController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, typeorm_1.InjectRepository)(model_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(model_1.ProductType)),
    __param(2, (0, typeorm_1.InjectRepository)(model_1.ProductBrand)),
    __param(3, (0, typeorm_1.InjectRepository)(model_1.ProductCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        cache_1.CatalogService])
], PsController);
exports.PsController = PsController;
//# sourceMappingURL=ps.controller.js.map