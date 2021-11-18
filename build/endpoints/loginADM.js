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
exports.loginADM = void 0;
const connection_1 = require("../data/connection");
const Authentication_1 = require("../services/Authentication");
const loginADM = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCode = 400;
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            statusCode = 401;
            throw new Error('Preencha todos os campos!');
        }
        const [user] = yield (0, connection_1.con)('case_fullstack_adm').where({
            email
        });
        if (!user) {
            statusCode = 404;
            throw new Error('Usuário não encontrado!');
        }
        const compare = new Authentication_1.Authentication().compare(password, user.password);
        if (!compare) {
            statusCode = 404;
            throw new Error('Usuário não encontrado!');
        }
        const token = new Authentication_1.Authentication().token(user.id);
        res.status(200).send({ access_token: token });
    }
    catch (error) {
        res.status(statusCode).send(error.message || error.sqlMessage);
    }
});
exports.loginADM = loginADM;
//# sourceMappingURL=loginADM.js.map