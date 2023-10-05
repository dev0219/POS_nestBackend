"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestEvent = void 0;
class RequestEvent {
    constructor(payload) {
        this.__payload = payload;
    }
    getAction() {
        return this.action;
    }
    getPayload() {
        return this.__payload;
    }
}
exports.RequestEvent = RequestEvent;
//# sourceMappingURL=RequestEvent.js.map