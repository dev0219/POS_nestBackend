"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductBrandCommand = void 0;
const RequestCommand_1 = require("../../RequestCommand");
const QueueEnum_1 = require("./QueueEnum");
class GetProductBrandCommand extends RequestCommand_1.RequestCommand {
    constructor() {
        super(...arguments);
        this.action = QueueEnum_1.QueueEnum.getBrand;
    }
}
exports.GetProductBrandCommand = GetProductBrandCommand;
//# sourceMappingURL=GetProductBrandCommand.js.map