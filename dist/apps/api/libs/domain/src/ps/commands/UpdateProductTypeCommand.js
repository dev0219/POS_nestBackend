"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductTypeCommand = void 0;
const RequestCommand_1 = require("../../RequestCommand");
const QueueEnum_1 = require("./QueueEnum");
class UpdateProductTypeCommand extends RequestCommand_1.RequestCommand {
    constructor() {
        super(...arguments);
        this.action = QueueEnum_1.QueueEnum.updateProductType;
    }
}
exports.UpdateProductTypeCommand = UpdateProductTypeCommand;
//# sourceMappingURL=UpdateProductTypeCommand.js.map