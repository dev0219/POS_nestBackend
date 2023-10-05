"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessTypeEntity = void 0;
const BusinessType_1 = require("../../../../../libs/domain/src/bs/model/BusinessType");
const typeorm_1 = require("typeorm");
const BaseSchema_1 = require("./interface/BaseSchema");
const BusinessTypeInterface_1 = require("./interface/BusinessTypeInterface");
exports.BusinessTypeEntity = new typeorm_1.EntitySchema({
    name: 'BusinessType',
    tableName: 'business_type',
    target: BusinessType_1.BusinessType,
    columns: Object.assign(Object.assign({}, BaseSchema_1.default), BusinessTypeInterface_1.default),
    relations: {
        business: {
            type: 'one-to-many',
            target: 'Business',
            inverseSide: 'business_type',
            joinColumn: {
                name: 'business_type_id',
            },
        },
        business_category: {
            type: 'many-to-one',
            target: 'BusinessCategory',
            inverseSide: 'business_type',
            joinColumn: {
                name: 'business_category_id',
            },
        },
    },
});
//# sourceMappingURL=BusinessType.schema.js.map