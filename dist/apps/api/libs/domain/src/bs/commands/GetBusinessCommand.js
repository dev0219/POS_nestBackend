"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBusinessCommand = void 0;
const RequestCommand_1 = require("../../RequestCommand");
const QueueEnum_1 = require("./QueueEnum");
class GetBusinessCommand extends RequestCommand_1.RequestCommand {
    constructor() {
        super(...arguments);
        this.action = QueueEnum_1.QueueEnum.getBusiness;
    }
}
exports.GetBusinessCommand = GetBusinessCommand;
//# sourceMappingURL=GetBusinessCommand.js.map