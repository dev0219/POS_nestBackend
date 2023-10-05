"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductBrandCommand = void 0;
const RequestCommand_1 = require("../../RequestCommand");
const QueueEnum_1 = require("./QueueEnum");
class CreateProductBrandCommand extends RequestCommand_1.RequestCommand {
    constructor() {
        super(...arguments);
        this.action = QueueEnum_1.QueueEnum.createProductCategory;
    }
}
exports.CreateProductBrandCommand = CreateProductBrandCommand;
//# sourceMappingURL=CreateProductBrandCommand.js.map