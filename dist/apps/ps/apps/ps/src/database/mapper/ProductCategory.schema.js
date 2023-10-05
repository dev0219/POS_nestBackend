"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoryEntity = void 0;
const typeorm_1 = require("typeorm");
const BaseSchema_1 = require("./interface/BaseSchema");
const model_1 = require("../../../../../libs/domain/src/ps/model");
exports.ProductCategoryEntity = new typeorm_1.EntitySchema({
    name: 'ProductCategory',
    tableName: 'product_category',
    target: model_1.ProductCategory,
    columns: Object.assign(Object.assign({}, BaseSchema_1.default), { name: {
            type: String,
            length: 200,
            nullable: false,
            comment: 'Name of product',
        }, products_count: {
            type: Number,
            nullable: false,
            comment: 'Number of products in the brand',
        } }),
    relations: {
        product_types: {
            type: 'one-to-many',
            target: 'ProductType',
            inverseSide: 'product_category',
        },
        product_brands: {
            type: 'many-to-many',
            target: 'ProductBrand',
            joinTable: {
                name: 'product_category_product_brand',
            },
            inverseSide: 'product_categories',
        },
    },
});
//# sourceMappingURL=ProductCategory.schema.js.map