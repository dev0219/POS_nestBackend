"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductCategoryCommand = void 0;
const RequestCommand_1 = require("../../RequestCommand");
const QueueEnum_1 = require("./QueueEnum");
class CreateProductCategoryCommand extends RequestCommand_1.RequestCommand {
    constructor() {
        super(...arguments);
        this.action = QueueEnum_1.QueueEnum.createProductCategory;
    }
}
exports.CreateProductCategoryCommand = CreateProductCategoryCommand;
//# sourceMappingURL=CreateProductCategoryCommand.js.map