"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductCommand = void 0;
const RequestCommand_1 = require("../../RequestCommand");
const QueueEnum_1 = require("./QueueEnum");
class CreateProductCommand extends RequestCommand_1.RequestCommand {
    constructor() {
        super(...arguments);
        this.action = QueueEnum_1.QueueEnum.createProduct;
    }
}
exports.CreateProductCommand = CreateProductCommand;
//# sourceMappingURL=CreateProductCommand.js.map