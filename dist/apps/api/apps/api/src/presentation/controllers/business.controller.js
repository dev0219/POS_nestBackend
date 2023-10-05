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
exports.BusinessController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const events_1 = require("../../../../../libs/events/src");
const ErrorCodeEnum_1 = require("../errors/ErrorCodeEnum");
const createBusinessRequest_1 = require("../../../../../libs/domain/src/bs/requests/createBusinessRequest");
const CreateBusinessCommand_1 = require("../../../../../libs/domain/src/bs/commands/CreateBusinessCommand");
const CreateBusinessSuggestedTypeCommand_1 = require("../../../../../libs/domain/src/bs/commands/CreateBusinessSuggestedTypeCommand");
const GetBusinessCommand_1 = require("../../../../../libs/domain/src/bs/commands/GetBusinessCommand");
const GetCategoriesByBusinessIdCommand_1 = require("../../../../../libs/domain/src/bs/commands/GetCategoriesByBusinessIdCommand");
const LoadProductsForBusinessCommand_1 = require("../../../../../libs/domain/src/bs/commands/LoadProductsForBusinessCommand");
const loadProductsForBusinessRequest_1 = require("../../../../../libs/domain/src/bs/requests/loadProductsForBusinessRequest");
const model_1 = require("../../../../../libs/domain/src/bs/model");
let BusinessController = class BusinessController {
    constructor(commandsService) {
        this.commandsService = commandsService;
    }
    async create(business) {
        try {
            const businessCreated = await this.commandsService.request(new CreateBusinessCommand_1.CreateBusinessCommand(business));
            if (business.business_type_suggested) {
                this.commandsService.request(new CreateBusinessSuggestedTypeCommand_1.CreateBusinessSuggestedTypeCommand({
                    name: business.business_type_suggested,
                    business: businessCreated.id,
                }));
            }
            return businessCreated;
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) in ErrorCodeEnum_1.ErrorCodeEnum) {
                throw new common_1.HttpException(error.message, ErrorCodeEnum_1.ErrorCodeEnum[`${error.code}`]);
            }
            throw error;
        }
    }
    async getBusinessById(id) {
        try {
            return await this.commandsService.request(new GetBusinessCommand_1.GetBusinessCommand(id));
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) in ErrorCodeEnum_1.ErrorCodeEnum) {
                throw new common_1.HttpException(error.message, ErrorCodeEnum_1.ErrorCodeEnum[`${error.code}`]);
            }
            throw error;
        }
    }
    async getProductsCategoriesByBusinessId(id) {
        try {
            return await this.commandsService.request(new GetCategoriesByBusinessIdCommand_1.GetCategoriesByBusinessIdCommand(id));
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) in ErrorCodeEnum_1.ErrorCodeEnum) {
                throw new common_1.HttpException(error.message, ErrorCodeEnum_1.ErrorCodeEnum[`${error.code}`]);
            }
            throw error;
        }
    }
    async loadProductsForBusiness(id, products_data) {
        products_data.businessId = id;
        try {
            const result = await this.commandsService.request(new LoadProductsForBusinessCommand_1.LoadProductsForBusinessCommand(products_data));
            return result;
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
        summary: 'Create a new business',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: model_1.Business,
        description: 'Business created successfully',
        status: 201,
    }),
    (0, swagger_1.ApiConflictResponse)({
        status: 409,
        description: 'This error should be returned when the business already exists. Check the address.',
        type: String,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        status: 432,
        description: 'This error should be returned when the business type is not found. Check the UUID.',
        type: String,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createBusinessRequest_1.CreateBusinessRequest]),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Returns a business by id',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: model_1.Business,
        description: 'Business returned successfully',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "getBusinessById", null);
__decorate([
    (0, common_1.Get)(':id/products_categories'),
    (0, swagger_1.ApiOperation)({
        summary: 'Returns a business products categories based by business ID.',
    }),
    (0, swagger_1.ApiOkResponse)({
        isArray: true,
        type: String,
        description: 'Business products categories returned successfully',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "getProductsCategoriesByBusinessId", null);
__decorate([
    (0, common_1.Post)(':id/product/load'),
    (0, swagger_1.ApiOperation)({
        summary: 'Load products for a business',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'String',
        description: 'Id for the business to add the products',
        example: '901b3a4b-4ea6-4fab-a328-f72fc4010cec',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Products sucessfully loaded',
        type: 'number',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, loadProductsForBusinessRequest_1.LoadProductsForBusinessRequest]),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "loadProductsForBusiness", null);
BusinessController = __decorate([
    (0, swagger_1.ApiTags)('Business'),
    (0, common_1.Controller)('business'),
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
    }),
    (0, swagger_1.ApiNoContentResponse)({
        status: 204,
        description: 'No content found with the specify params',
    }),
    __metadata("design:paramtypes", [events_1.CommandsService])
], BusinessController);
exports.BusinessController = BusinessController;
//# sourceMappingURL=business.controller.js.map