"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductCategoryCommand = void 0;
const RequestCommand_1 = require("../../RequestCommand");
const QueueEnum_1 = require("./QueueEnum");
class GetProductCategoryCommand extends RequestCommand_1.RequestCommand {
    constructor() {
        super(...arguments);
        this.action = QueueEnum_1.QueueEnum.getCategory;
    }
}
exports.GetProductCategoryCommand = GetProductCategoryCommand;
//# sourceMappingURL=GetProductCategoryCommand.js.map