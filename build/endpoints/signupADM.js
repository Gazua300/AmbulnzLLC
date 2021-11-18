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
exports.signupADM = void 0;
const connection_1 = require("../data/connection");
const Authentication_1 = require("../services/Authentication");
const signupADM = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCode = 400;
    try {
        const { name, email, password, passConfirm } = req.body;
        if (!name || !email || !password || !passConfirm) {
            statusCode = 401;
            throw new Error('Preencha todos os campos!');
        }
        if (email.indexOf('@') === -1
            ||
                email.indexOf('.') === -1) {
            statusCode = 403;
            throw new Error('Digite um email válido!');
        }
        if (password !== passConfirm) {
            statusCode = 403;
            throw new Error('As senhas não conferem!');
        }
        const [user] = yield (0, connection_1.con)('case_fullstack_adm').where({
            email
        });
        if (user) {
            statusCode = 403;
            throw new Error('Email já cadastrado');
        }
        const id = new Authentication_1.Authentication().generateId();
        const hash = new Authentication_1.Authentication().hash(password);
        yield (0, connection_1.con)('case_fullstack_adm').insert({
            id,
            name,
            email,
            password: hash
        });
        const token = new Authentication_1.Authentication().token(id);
        res.status(200).send({ access_token: token });
    }
    catch (error) {
        res.status(statusCode).send(error.message || error.sqlMessage);
    }
});
exports.signupADM = signupADM;
//# sourceMappingURL=signupADM.js.map