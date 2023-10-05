"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessEntity = void 0;
const typeorm_1 = require("typeorm");
const BusinessInterface_1 = require("./interface/BusinessInterface");
const BaseSchema_1 = require("./interface/BaseSchema");
const Business_1 = require("../../../../../libs/domain/src/bs/model/Business");
exports.BusinessEntity = new typeorm_1.EntitySchema({
    name: 'Business',
    tableName: 'business',
    target: Business_1.Business,
    columns: Object.assign(Object.assign({}, BaseSchema_1.default), BusinessInterface_1.default),
    relations: {
        business_type: {
            type: 'many-to-one',
            target: 'BusinessType',
            joinColumn: {
                name: 'business_type_id',
            },
            inverseSide: 'business',
        },
    },
});
//# sourceMappingURL=Business.schema.js.map