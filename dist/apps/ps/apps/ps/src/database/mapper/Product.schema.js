"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntity = void 0;
const typeorm_1 = require("typeorm");
const BaseSchema_1 = require("./interface/BaseSchema");
const Product_1 = require("../../../../../libs/domain/src/ps/model/Product");
const ProductInterface_1 = require("./interface/ProductInterface");
exports.ProductEntity = new typeorm_1.EntitySchema({
    name: 'Product',
    tableName: 'product',
    target: Product_1.Product,
    columns: Object.assign(Object.assign({}, BaseSchema_1.default), ProductInterface_1.default),
    relations: {
        product_brand: {
            type: 'many-to-one',
            target: 'ProductBrand',
            joinColumn: {
                name: 'product_brand_id',
            },
            inverseSide: 'product',
        },
        product_type: {
            type: 'many-to-one',
            target: 'ProductType',
            joinColumn: {
                name: 'product_type_id',
            },
            inverseSide: 'product',
        },
        product_types: {
            type: 'many-to-many',
            target: 'ProductType',
            joinTable: {
                name: 'product_product_type',
            },
        },
    },
});
//# sourceMappingURL=Product.schema.js.map