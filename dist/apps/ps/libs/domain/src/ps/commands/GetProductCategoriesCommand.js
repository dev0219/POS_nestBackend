"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductCategoriesCommand = void 0;
const RequestCommand_1 = require("../../RequestCommand");
const QueueEnum_1 = require("./QueueEnum");
class GetProductCategoriesCommand extends RequestCommand_1.RequestCommand {
    constructor() {
        super(...arguments);
        this.action = QueueEnum_1.QueueEnum.getCategories;
    }
}
exports.GetProductCategoriesCommand = GetProductCategoriesCommand;
//# sourceMappingURL=GetProductCategoriesCommand.js.map