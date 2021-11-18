"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listOfOrders = void 0;
const connection_1 = require("../data/connection");
const Authentication_1 = require("../services/Authentication");
const listOfOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCode = 400;
    try {
        const token = req.headers.authorization;
        const tokenData = new Authentication_1.Authentication().tokenData(token);
        if (!token) {
            statusCode = 401;
            throw new Error('Token inválido, expirado ou ausente do headers.');
        }
        const [user] = yield (0, connection_1.con)('case_fullstack_adm').where({
            id: tokenData.payload
        });
        if (!user) {
            statusCode = 403;
            throw new Error('Você deve estar logado!');
        }
        const orders = yield (0, connection_1.con)('case_fullstack_orders');
        res.status(200).send(orders);
    }
    catch (error) {
        res.status(statusCode).send(error.message || error.sqlMessage);
    }
});
exports.listOfOrders = listOfOrders;
//# sourceMappingURL=listOfOrders.js.map