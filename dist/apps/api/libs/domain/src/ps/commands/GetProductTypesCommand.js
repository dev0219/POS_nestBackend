"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductTypesCommand = void 0;
const RequestCommand_1 = require("../../RequestCommand");
const QueueEnum_1 = require("./QueueEnum");
class GetProductTypesCommand extends RequestCommand_1.RequestCommand {
    constructor() {
        super(...arguments);
        this.action = QueueEnum_1.QueueEnum.getProductTypes;
    }
}
exports.GetProductTypesCommand = GetProductTypesCommand;
//# sourceMappingURL=GetProductTypesCommand.js.map