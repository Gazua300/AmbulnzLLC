"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.con = void 0;
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.con = (0, knex_1.default)({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA
    }
});
//# sourceMappingURL=connection.js.map