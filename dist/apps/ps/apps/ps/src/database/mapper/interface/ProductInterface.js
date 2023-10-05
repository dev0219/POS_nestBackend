"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    barcode: {
        type: String,
        length: 48,
        nullable: false,
        comment: 'Barcode of product',
    },
    name: {
        type: String,
        length: 200,
        nullable: false,
        comment: 'Name of product',
    },
    short_name: {
        type: String,
        length: 200,
        nullable: false,
        comment: 'Short name of product',
    },
    measure: {
        type: Number,
        nullable: false,
        comment: 'Measure of product',
    },
    photoUrl: {
        type: String,
        nullable: true,
        comment: 'photo of product',
    },
};
//# sourceMappingURL=ProductInterface.js.map