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
exports.createOrder = void 0;
const connection_1 = require("../data/connection");
const Authentication_1 = require("../services/Authentication");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCode = 400;
    try {
        const { pizza, quantity } = req.body;
        const currentTime = new Date();
        if (!pizza || !quantity) {
            statusCode = 401;
            throw new Error('Dados inválidos, por favor verifique os campos e tente novamente.');
        }
        const [checkPizza] = yield (0, connection_1.con)('case_fullstack_pizza').where({
            name: pizza
        });
        if (!checkPizza) {
            statusCode = 404;
            throw new Error('Pizza não encontrada no cardápio.');
        }
        const id = new Authentication_1.Authentication().generateId();
        yield (0, connection_1.con)('case_fullstack_orders').insert({
            id,
            pizza,
            price: checkPizza.price,
            quantity,
            total: checkPizza.price * quantity,
            date: currentTime.toLocaleDateString()
        });
        res.status(200).send('Pedido realizado com sucesso!');
    }
    catch (error) {
        res.status(statusCode).send(error.message || error.sqlMessage);
    }
});
exports.createOrder = createOrder;
//# sourceMappingURL=createOrder.js.map