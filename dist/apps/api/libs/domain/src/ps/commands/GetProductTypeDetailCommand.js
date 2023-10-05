"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductTypeDetailCommand = void 0;
const RequestCommand_1 = require("../../RequestCommand");
const QueueEnum_1 = require("./QueueEnum");
class GetProductTypeDetailCommand extends RequestCommand_1.RequestCommand {
    constructor() {
        super(...arguments);
        this.action = QueueEnum_1.QueueEnum.getProductTypeDetail;
    }
}
exports.GetProductTypeDetailCommand = GetProductTypeDetailCommand;
//# sourceMappingURL=GetProductTypeDetailCommand.js.map