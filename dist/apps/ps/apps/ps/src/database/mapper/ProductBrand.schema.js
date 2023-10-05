"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductBrandEntity = void 0;
const typeorm_1 = require("typeorm");
const BaseSchema_1 = require("./interface/BaseSchema");
const model_1 = require("../../../../../libs/domain/src/ps/model");
exports.ProductBrandEntity = new typeorm_1.EntitySchema({
    name: 'ProductBrand',
    tableName: 'product_brand',
    target: model_1.ProductBrand,
    columns: Object.assign(Object.assign({}, BaseSchema_1.default), { name: {
            type: String,
            length: 200,
            nullable: false,
            comment: 'Name of brand',
        }, products_count: {
            type: Number,
            comment: 'Number of products in the brand',
        } }),
    relations: {
        products: {
            type: 'one-to-many',
            target: 'Product',
            inverseSide: 'product_brand',
        },
        product_categories: {
            type: 'many-to-many',
            target: 'ProductCategory',
            joinTable: {
                name: 'product_category_product_brand',
            },
            inverseSide: 'product_brands',
        },
    },
});
//# sourceMappingURL=ProductBrand.schema.js.map