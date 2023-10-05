"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessEventEntity = void 0;
const model_1 = require("../../../../../libs/domain/src/bs/model");
const typeorm_1 = require("typeorm");
const BaseSchema_1 = require("./interface/BaseSchema");
const BusinessEventInterface_1 = require("./interface/BusinessEventInterface");
exports.BusinessEventEntity = new typeorm_1.EntitySchema({
    name: 'BusinessEvent',
    tableName: 'business_event',
    target: model_1.BusinessEvent,
    columns: Object.assign(Object.assign({}, BaseSchema_1.default), BusinessEventInterface_1.default),
});
//# sourceMappingURL=BusinessEvent.schema.js.map