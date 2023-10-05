"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductsCommand = void 0;
const RequestCommand_1 = require("../../RequestCommand");
const QueueEnum_1 = require("./QueueEnum");
class GetProductsCommand extends RequestCommand_1.RequestCommand {
    constructor() {
        super(...arguments);
        this.action = QueueEnum_1.QueueEnum.getProducts;
    }
}
exports.GetProductsCommand = GetProductsCommand;
//# sourceMappingURL=GetProductsCommand.js.map