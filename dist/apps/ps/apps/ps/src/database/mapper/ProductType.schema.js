"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTypeEntity = void 0;
const typeorm_1 = require("typeorm");
const BaseSchema_1 = require("./interface/BaseSchema");
const model_1 = require("../../../../../libs/domain/src/ps/model");
exports.ProductTypeEntity = new typeorm_1.EntitySchema({
    name: 'ProductType',
    tableName: 'product_type',
    target: model_1.ProductType,
    columns: Object.assign(Object.assign({}, BaseSchema_1.default), { name: {
            type: String,
            length: 200,
            nullable: false,
            comment: 'Name of product',
        }, products_count: {
            type: Number,
            comment: 'Number of products in the brand',
        } }),
    relations: {
        products: {
            type: 'many-to-many',
            target: 'Product',
            joinTable: {
                name: 'product_product_type',
            },
        },
        product_category: {
            type: 'many-to-one',
            target: 'ProductCategory',
            joinColumn: {
                name: 'product_category_id',
            },
            inverseSide: 'product_types',
        },
    },
});
//# sourceMappingURL=ProductType.schema.js.map