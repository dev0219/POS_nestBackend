"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessProductEntity = void 0;
const typeorm_1 = require("typeorm");
const BaseSchema_1 = require("./interface/BaseSchema");
const BusinessProduct_1 = require("../../../../../libs/domain/src/bs/model/BusinessProduct");
exports.BusinessProductEntity = new typeorm_1.EntitySchema({
    name: 'BusinessProduct',
    tableName: 'business_product',
    target: BusinessProduct_1.BusinessProduct,
    columns: Object.assign(Object.assign({}, BaseSchema_1.default), { business_id: {
            type: String,
            length: 255,
            nullable: false,
        }, product_id: {
            type: String,
            length: 255,
            nullable: false,
        } }),
});
//# sourceMappingURL=BusinessProduct.schema.js.map