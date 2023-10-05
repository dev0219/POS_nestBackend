"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductDetailCommand = void 0;
const RequestCommand_1 = require("../../RequestCommand");
const QueueEnum_1 = require("./QueueEnum");
class GetProductDetailCommand extends RequestCommand_1.RequestCommand {
    constructor() {
        super(...arguments);
        this.action = QueueEnum_1.QueueEnum.getProductDetail;
    }
}
exports.GetProductDetailCommand = GetProductDetailCommand;
//# sourceMappingURL=GetProductDetailCommand.js.map