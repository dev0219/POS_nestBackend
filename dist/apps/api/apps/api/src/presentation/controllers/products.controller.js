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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const events_1 = require("../../../../../libs/events/src");
const platform_express_1 = require("@nestjs/platform-express");
const remote_storage_1 = require("../../../../../libs/remote-storage/src");
const ErrorCodeEnum_1 = require("../errors/ErrorCodeEnum");
const createProductRequest_1 = require("../../../../../libs/domain/src/ps/requests/createProductRequest");
const createProductCategoryRequest_1 = require("../../../../../libs/domain/src/ps/requests/createProductCategoryRequest");
const createProductBrandRequest_1 = require("../../../../../libs/domain/src/ps/requests/createProductBrandRequest");
const CreateProductCommand_1 = require("../../../../../libs/domain/src/ps/commands/CreateProductCommand");
const CreateProductCategoryCommand_1 = require("../../../../../libs/domain/src/ps/commands/CreateProductCategoryCommand");
const CreateProductBrandCommand_1 = require("../../../../../libs/domain/src/ps/commands/CreateProductBrandCommand");
const model_1 = require("../../../../../libs/domain/src/ps/model");
const commands_1 = require("../../../../../libs/domain/src/ps/commands");
const createProductTypeRequest_1 = require("../../../../../libs/domain/src/ps/requests/createProductTypeRequest");
const CreateProductTypeCommand_1 = require("../../../../../libs/domain/src/ps/commands/CreateProductTypeCommand");
const GetProductTypesCommand_1 = require("../../../../../libs/domain/src/ps/commands/GetProductTypesCommand");
const GetProductTypeDetailCommand_1 = require("../../../../../libs/domain/src/ps/commands/GetProductTypeDetailCommand");
const DeleteProductTypeCommand_1 = require("../../../../../libs/domain/src/ps/commands/DeleteProductTypeCommand");
const UpdateProductTypeCommand_1 = require("../../../../../libs/domain/src/ps/commands/UpdateProductTypeCommand");
let ProductsController = class ProductsController {
    constructor(commandsService, remoteStorageService) {
        this.commandsService = commandsService;
        this.remoteStorageService = remoteStorageService;
    }
    async create(product, photo) {
        try {
            if (photo && !new RegExp(/\/(jpg|jpeg|png)$/).test(photo.mimetype))
                throw new common_1.HttpException('The file type is invalid.', 422);
            if (photo) {
                const extension = photo.originalname.split('.').pop();
                const fileName = `${new Date().getTime()}-product.${extension}`;
                const name = `new_product/${fileName}`;
                await this.remoteStorageService.saveFile(name, photo.buffer, 'Temporal Transactions');
                const link = await this.remoteStorageService.getLink(name);
                product.photoUrl = link;
            }
            const productcreated = await this.commandsService.request(new CreateProductCommand_1.CreateProductCommand(product));
            return productcreated;
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) in ErrorCodeEnum_1.ErrorCodeEnum) {
                throw new common_1.HttpException(error.message, ErrorCodeEnum_1.ErrorCodeEnum[`${error.code}`]);
            }
            throw error;
        }
    }
    async getProducts(categoryId, brandId, text, page, take) {
        try {
            return await this.commandsService.request(new commands_1.GetProductsCommand({
                categoryId,
                brandId,
                text,
                page,
                take,
            }));
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) in ErrorCodeEnum_1.ErrorCodeEnum) {
                throw new common_1.HttpException(error.message, ErrorCodeEnum_1.ErrorCodeEnum[`${error.code}`]);
            }
            throw error;
        }
    }
    async getProductTypes(name, page, take) {
        try {
            return await this.commandsService.request(new GetProductTypesCommand_1.GetProductTypesCommand({
                name,
                page,
                take,
            }));
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) in ErrorCodeEnum_1.ErrorCodeEnum) {
                throw new common_1.HttpException(error.message, ErrorCodeEnum_1.ErrorCodeEnum[`${error.code}`]);
            }
            throw error;
        }
    }
    async getCategories() {
        try {
            return await this.commandsService.request(new commands_1.GetProductCategoriesCommand());
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) in ErrorCodeEnum_1.ErrorCodeEnum) {
                throw new common_1.HttpException(error.message, ErrorCodeEnum_1.ErrorCodeEnum[`${error.code}`]);
            }
            throw error;
        }
    }
    async getProductDetail(productId) {
        try {
            return await this.commandsService.request(new commands_1.GetProductDetailCommand(productId));
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) in ErrorCodeEnum_1.ErrorCodeEnum) {
                throw new common_1.HttpException(error.message, ErrorCodeEnum_1.ErrorCodeEnum[`${error.code}`]);
            }
            throw error;
        }
    }
    async updateProductType(productTypeId, productType) {
        let productUpdateBody = { productTypeId: productTypeId, productType: productType };
        try {
            const product_type_update = await this.commandsService.request(new UpdateProductTypeCommand_1.UpdateProductTypeCommand(productUpdateBody));
            return product_type_update;
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) in ErrorCodeEnum_1.ErrorCodeEnum) {
                throw new common_1.HttpException(error.message, ErrorCodeEnum_1.ErrorCodeEnum[`${error.code}`]);
            }
            throw error;
        }
    }
    async getProductTypeDetail(productTypeId) {
        try {
            return await this.commandsService.request(new GetProductTypeDetailCommand_1.GetProductTypeDetailCommand(productTypeId));
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) in ErrorCodeEnum_1.ErrorCodeEnum) {
                throw new common_1.HttpException(error.message, ErrorCodeEnum_1.ErrorCodeEnum[`${error.code}`]);
            }
            throw error;
        }
    }
    async createProductType(productType) {
        try {
            const product_type_created = await this.commandsService.request(new CreateProductTypeCommand_1.CreateProductTypeCommand(productType));
            return product_type_created;
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) in ErrorCodeEnum_1.ErrorCodeEnum) {
                throw new common_1.HttpException(error.message, ErrorCodeEnum_1.ErrorCodeEnum[`${error.code}`]);
            }
            throw error;
        }
    }
    async deleteProductType(productTypeId) {
        try {
            const delet = await this.commandsService.request(new DeleteProductTypeCommand_1.DeleteProductTypeCommand(productTypeId));
            return delet;
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) in ErrorCodeEnum_1.ErrorCodeEnum) {
                throw new common_1.HttpException(error.message, ErrorCodeEnum_1.ErrorCodeEnum[`${error.code}`]);
            }
            throw error;
        }
    }
    async createProductCategory(productCategory) {
        try {
            const product_category_created = await this.commandsService.request(new CreateProductCategoryCommand_1.CreateProductCategoryCommand(productCategory));
            return product_category_created;
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) in ErrorCodeEnum_1.ErrorCodeEnum) {
                throw new common_1.HttpException(error.message, ErrorCodeEnum_1.ErrorCodeEnum[`${error.code}`]);
            }
            throw error;
        }
    }
    async getCategoryWithBrands(categoryId) {
        try {
            return await this.commandsService.request(new commands_1.GetProductCategoryCommand(categoryId));
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) in ErrorCodeEnum_1.ErrorCodeEnum) {
                throw new common_1.HttpException(error.message, ErrorCodeEnum_1.ErrorCodeEnum[`${error.code}`]);
            }
            throw error;
        }
    }
    async createProductBrand(productBrand) {
        try {
            const product_brand_created = await this.commandsService.request(new CreateProductBrandCommand_1.CreateProductBrandCommand(productBrand));
            return product_brand_created;
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) in ErrorCodeEnum_1.ErrorCodeEnum) {
                throw new common_1.HttpException(error.message, ErrorCodeEnum_1.ErrorCodeEnum[`${error.code}`]);
            }
            throw error;
        }
    }
    async getBrandWithCategories(brandId) {
        try {
            return await this.commandsService.request(new commands_1.GetProductBrandCommand(brandId));
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) in ErrorCodeEnum_1.ErrorCodeEnum) {
                throw new common_1.HttpException(error.message, ErrorCodeEnum_1.ErrorCodeEnum[`${error.code}`]);
            }
            throw error;
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new product',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: model_1.Product,
        description: 'Product created successfully',
        status: 201,
    }),
    (0, swagger_1.ApiConflictResponse)({
        status: 409,
        description: 'This error should be returned when the product already exists. Check the name.',
        type: String,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        status: 432,
        description: 'This error should be returned when the product type is not found. Check the UUID.',
        type: String,
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("photo")),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProductRequest_1.CreateProductRequest, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all products',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'categoryId',
        type: String,
        description: 'Used parameter to filter by CategoryId. Optional',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'brandId',
        type: String,
        description: 'Used parameter to filter by BrandId. Optional',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'text',
        type: String,
        description: 'Used parameter to filter by name. Optional',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        type: Number,
        description: 'Used parameter to paginate the data',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'take',
        type: Number,
        description: 'Used parameter to paginate the data',
        required: false,
    }),
    __param(0, (0, common_1.Query)('categoryId')),
    __param(1, (0, common_1.Query)('brandId')),
    __param(2, (0, common_1.Query)('text')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)('type'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all product types',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'name',
        type: String,
        description: 'Used parameter to filter by name. Optional',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        type: Number,
        description: 'Used parameter to paginate the data. Optional',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'take',
        type: Number,
        description: 'Used parameter to paginate the data. Optional',
        required: false,
    }),
    __param(0, (0, common_1.Query)('name')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductTypes", null);
__decorate([
    (0, common_1.Get)('/category'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all product categories',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('/:productId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get product detail',
    }),
    (0, swagger_1.ApiParam)({
        name: 'productId',
        type: String,
        description: 'Used parameter to filter by ProductId',
        required: true,
    }),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductDetail", null);
__decorate([
    (0, common_1.Put)('/type/:productTypeId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a product type',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: model_1.ProductCategory,
        description: 'Product type updated successfully',
        status: 201,
    }),
    (0, swagger_1.ApiConflictResponse)({
        status: 409,
        description: 'This error should be returned when the product type already exists. Check the name.',
        type: String,
    }),
    (0, swagger_1.ApiParam)({
        name: 'productTypeId',
        type: String,
        description: 'Used parameter to update by ProductTypeId',
        required: true,
    }),
    __param(0, (0, common_1.Param)('productTypeId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, model_1.ProductType]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProductType", null);
__decorate([
    (0, common_1.Get)('/type/:productTypeId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get product type detail',
    }),
    (0, swagger_1.ApiParam)({
        name: 'productTypeId',
        type: String,
        description: 'Used parameter to filter by ProductTypeId',
        required: true,
    }),
    __param(0, (0, common_1.Param)('productTypeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductTypeDetail", null);
__decorate([
    (0, common_1.Post)('/type'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new product type',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: model_1.ProductCategory,
        description: 'Product type created successfully',
        status: 201,
    }),
    (0, swagger_1.ApiConflictResponse)({
        status: 409,
        description: 'This error should be returned when the product type already exists. Check the name.',
        type: String,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProductTypeRequest_1.CreateProductTypeRequest]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProductType", null);
__decorate([
    (0, common_1.Delete)('/type/:productTypeId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a product type',
    }),
    (0, swagger_1.ApiParam)({
        name: 'productTypeId',
        type: String,
        description: 'Used parameter to delete by ProductTypeId',
        required: true,
    }),
    __param(0, (0, common_1.Param)('productTypeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProductType", null);
__decorate([
    (0, common_1.Post)('/category'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new product category',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: model_1.ProductCategory,
        description: 'Product category created successfully',
        status: 201,
    }),
    (0, swagger_1.ApiConflictResponse)({
        status: 409,
        description: 'This error should be returned when the product category already exists. Check the name.',
        type: String,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProductCategoryRequest_1.CreateProductCategoryRequest]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProductCategory", null);
__decorate([
    (0, common_1.Get)('/category/:categoryId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get the category with the relations of brands.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'categoryId',
        type: String,
        description: 'Used parameter to filter by CategoryId',
        required: true,
    }),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getCategoryWithBrands", null);
__decorate([
    (0, common_1.Post)('/brand'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new product brand',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: model_1.ProductBrand,
        description: 'Product brand created successfully',
        status: 201,
    }),
    (0, swagger_1.ApiConflictResponse)({
        status: 409,
        description: 'This error should be returned when the product brand already exists. Check the name.',
        type: String,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProductBrandRequest_1.CreateProductBrandRequest]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProductBrand", null);
__decorate([
    (0, common_1.Get)('/brand/:brandId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get the brands with the relations of categories.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'brandId',
        type: String,
        description: 'Used parameter to filter by BrandId',
        required: true,
    }),
    __param(0, (0, common_1.Param)('brandId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getBrandWithCategories", null);
ProductsController = __decorate([
    (0, swagger_1.ApiTags)('products'),
    (0, common_1.Controller)('products'),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Server error: Internal server error, check with API administrator.',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: 400,
        description: 'Bad request, throws error, please check body and params.',
    }),
    (0, swagger_1.ApiUnprocessableEntityResponse)({
        status: 422,
        description: 'This error should be returned when some required fields are missing. Check the body.',
        type: String,
    }),
    (0, swagger_1.ApiNoContentResponse)({
        status: 204,
        description: 'No content found with the specify params',
    }),
    __metadata("design:paramtypes", [events_1.CommandsService,
        remote_storage_1.RemoteStorageService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map