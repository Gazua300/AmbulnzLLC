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
exports.pizzaById = void 0;
const connection_1 = require("../data/connection");
const pizzaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCode = 400;
    try {
        const [pizza] = yield (0, connection_1.con)('case_fullstack_pizza').where({
            id: req.params.id
        });
        if (!pizza) {
            statusCode = 404;
            throw new Error('Dados inválidos ou pedido inexistente.');
        }
        res.status(200).send(pizza);
    }
    catch (error) {
        res.status(statusCode).send(error.message || error.sqlMessage);
    }
});
exports.pizzaById = pizzaById;
//# sourceMappingURL=pizzaById.js.map