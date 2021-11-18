"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const signupADM_1 = require("./endpoints/signupADM");
const loginADM_1 = require("./endpoints/loginADM");
const showPizzas_1 = require("./endpoints/showPizzas");
const createOrder_1 = require("./endpoints/createOrder");
const listOfOrders_1 = require("./endpoints/listOfOrders");
const orderById_1 = require("./endpoints/orderById");
const insertPizza_1 = require("./endpoints/insertPizza");
const pizzaById_1 = require("./endpoints/pizzaById");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/signup', signupADM_1.signupADM);
app.post('/login', loginADM_1.loginADM);
app.post('/orders', createOrder_1.createOrder);
app.post('/pizzas', insertPizza_1.insertPizza);
app.get('/orders', listOfOrders_1.listOfOrders);
app.get('/orders/:id', orderById_1.orderById);
app.get('/pizzas', showPizzas_1.showPizzas);
app.get('/pizzas/:id', pizzaById_1.pizzaById);
app.listen(process.env.PORT || 3003, () => {
    console.log('Server running at 3003');
});
//# sourceMappingURL=index.js.map