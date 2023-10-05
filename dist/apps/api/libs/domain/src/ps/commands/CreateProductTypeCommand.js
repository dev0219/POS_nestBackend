"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductTypeCommand = void 0;
const RequestCommand_1 = require("../../RequestCommand");
const QueueEnum_1 = require("./QueueEnum");
class CreateProductTypeCommand extends RequestCommand_1.RequestCommand {
    constructor() {
        super(...arguments);
        this.action = QueueEnum_1.QueueEnum.createProductType;
    }
}
exports.CreateProductTypeCommand = CreateProductTypeCommand;
//# sourceMappingURL=CreateProductTypeCommand.js.map