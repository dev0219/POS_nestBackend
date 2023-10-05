"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: {
        type: String,
        length: 200,
        nullable: false,
        comment: 'Name of the business',
    },
    address: {
        type: String,
        length: 500,
        unique: true,
        comment: 'Address of the business',
    },
    gps: {
        type: 'point',
        comment: 'GPS coordinates of the business',
    },
    phone: {
        type: String,
        length: 20,
        unique: false,
        nullable: true,
        comment: 'Phone number of the business',
    },
    business_type_id: {
        type: 'uuid',
    },
};
//# sourceMappingURL=BusinessInterface.js.map