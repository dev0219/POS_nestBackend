"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestCommand = void 0;
class RequestCommand {
    constructor(payload) {
        this.__payload = payload;
    }
    getAction() {
        return this.action;
    }
    getPayload() {
        var _a;
        return (_a = this.__payload) !== null && _a !== void 0 ? _a : true;
    }
    createOutput() {
        return {};
    }
}
exports.RequestCommand = RequestCommand;
//# sourceMappingURL=RequestCommand.js.map