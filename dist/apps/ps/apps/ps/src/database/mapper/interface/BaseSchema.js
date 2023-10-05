"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: {
        type: 'uuid',
        primary: true,
        generated: 'uuid',
        primaryGeneratedColumn: 'uuid',
    },
    createdAt: {
        name: 'created_at',
        type: 'timestamp with time zone',
        createDate: true,
    },
    updatedAt: {
        name: 'updated_at',
        type: 'timestamp with time zone',
        updateDate: true,
    },
    updatedBy: {
        name: 'updated_by',
        type: String,
        nullable: true,
    },
};
//# sourceMappingURL=BaseSchema.js.map