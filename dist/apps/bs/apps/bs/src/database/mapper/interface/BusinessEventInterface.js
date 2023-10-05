"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    version: {
        type: Number,
        nullable: false,
        comment: 'Version of the event in the business',
    },
    payload: {
        type: 'jsonb',
        nullable: false,
        comment: 'Payload of the event',
    },
    event_type: {
        type: Number,
        nullable: false,
        comment: 'Type of the event',
    },
};
//# sourceMappingURL=BusinessEventInterface.js.map