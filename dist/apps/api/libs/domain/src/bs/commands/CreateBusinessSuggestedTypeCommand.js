"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBusinessSuggestedTypeCommand = void 0;
const RequestCommand_1 = require("../../RequestCommand");
const QueueEnum_1 = require("./QueueEnum");
class CreateBusinessSuggestedTypeCommand extends RequestCommand_1.RequestCommand {
    constructor() {
        super(...arguments);
        this.action = QueueEnum_1.QueueEnum.createSuggestedType;
    }
}
exports.CreateBusinessSuggestedTypeCommand = CreateBusinessSuggestedTypeCommand;
//# sourceMappingURL=CreateBusinessSuggestedTypeCommand.js.map