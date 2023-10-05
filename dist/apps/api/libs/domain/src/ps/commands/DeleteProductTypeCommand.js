"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductTypeCommand = void 0;
const RequestCommand_1 = require("../../RequestCommand");
const QueueEnum_1 = require("./QueueEnum");
class DeleteProductTypeCommand extends RequestCommand_1.RequestCommand {
    constructor() {
        super(...arguments);
        this.action = QueueEnum_1.QueueEnum.delProductType;
    }
}
exports.DeleteProductTypeCommand = DeleteProductTypeCommand;
//# sourceMappingURL=DeleteProductTypeCommand.js.map