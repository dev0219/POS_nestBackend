"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessTypeProductCategoryEntity = void 0;
const model_1 = require("../../../../../libs/domain/src/bs/model");
const typeorm_1 = require("typeorm");
const BaseSchema_1 = require("./interface/BaseSchema");
exports.BusinessTypeProductCategoryEntity = new typeorm_1.EntitySchema({
    name: 'BusinessTypeProductCategory',
    tableName: 'business_type_product_category',
    target: model_1.BusinessTypeProductCategory,
    columns: Object.assign(Object.assign({}, BaseSchema_1.default), { business_type_id: {
            type: String,
            length: 255,
            nullable: false,
        }, product_category_id: {
            type: String,
            length: 255,
            nullable: false,
        } }),
});
//# sourceMappingURL=BusinessTypeProductCategory.schema.js.map