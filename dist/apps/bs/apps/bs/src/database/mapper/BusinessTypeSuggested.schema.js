"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessTypeSuggestedEntity = void 0;
const typeorm_1 = require("typeorm");
const BaseSchema_1 = require("./interface/BaseSchema");
const BusinessTypeInterface_1 = require("./interface/BusinessTypeInterface");
const BusinessTypeSuggested_1 = require("../../../../../libs/domain/src/bs/model/BusinessTypeSuggested");
exports.BusinessTypeSuggestedEntity = new typeorm_1.EntitySchema({
    name: 'BusinessTypeSuggested',
    tableName: 'business_type_suggested',
    target: BusinessTypeSuggested_1.BusinessTypeSuggested,
    columns: Object.assign(Object.assign({}, BaseSchema_1.default), BusinessTypeInterface_1.default),
    relations: {
        business: {
            type: 'one-to-one',
            target: 'Business',
            inverseSide: 'business_type_suggested',
            joinColumn: { name: 'business_id' },
        },
        business_category: {
            type: 'many-to-one',
            target: 'BusinessCategory',
            inverseSide: 'business_type_suggested',
            joinColumn: {
                name: 'business_category_id',
            },
        },
    },
});
//# sourceMappingURL=BusinessTypeSuggested.schema.js.map