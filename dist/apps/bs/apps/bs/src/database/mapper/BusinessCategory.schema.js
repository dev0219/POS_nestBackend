"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessCategoryEntity = void 0;
const BusinessCategory_1 = require("../../../../../libs/domain/src/bs/model/BusinessCategory");
const typeorm_1 = require("typeorm");
const BaseSchema_1 = require("./interface/BaseSchema");
const BusinessCategoryInterface_1 = require("./interface/BusinessCategoryInterface");
exports.BusinessCategoryEntity = new typeorm_1.EntitySchema({
    name: 'BusinessCategory',
    tableName: 'business_category',
    target: BusinessCategory_1.BusinessCategory,
    columns: Object.assign(Object.assign({}, BaseSchema_1.default), BusinessCategoryInterface_1.default),
    relations: {
        business: {
            type: 'one-to-many',
            target: 'Business',
            inverseSide: 'business_category',
        },
        business_type: {
            type: 'one-to-many',
            target: 'BusinessType',
            inverseSide: 'business_category',
        },
    },
});
//# sourceMappingURL=BusinessCategory.schema.js.map