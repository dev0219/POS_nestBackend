"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDBConfig = void 0;
const path_1 = require("path");
function getDBConfig() {
    const entityPath = (0, path_1.join)(__dirname, '**', '*.schema.{ts,js}');
    console.log(process.env.PS_DB_HOST);
    return {
        type: 'postgres',
        host: process.env.PS_DB_HOST,
        port: Number.parseInt(process.env.PS_DB_PORT),
        username: process.env.PS_DB_USERNAME,
        password: process.env.PS_DB_PASSWORD,
        database: process.env.PS_DB_DATABASE,
        entities: [entityPath],
        synchronize: false,
        autoLoadEntities: true,
    };
}
exports.getDBConfig = getDBConfig;
//# sourceMappingURL=config.js.map