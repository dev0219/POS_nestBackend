"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadProductsForBusinessCommand = void 0;
const RequestCommand_1 = require("../../RequestCommand");
const QueueEnum_1 = require("./QueueEnum");
class LoadProductsForBusinessCommand extends RequestCommand_1.RequestCommand {
    constructor() {
        super(...arguments);
        this.action = QueueEnum_1.QueueEnum.loadProductsForBusiness;
    }
}
exports.LoadProductsForBusinessCommand = LoadProductsForBusinessCommand;
//# sourceMappingURL=LoadProductsForBusinessCommand.js.map