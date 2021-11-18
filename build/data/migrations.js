"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
connection_1.con.raw(`

`)
    .then(() => {
    console.log('Table has created');
})
    .catch(err => {
    console.log(err);
})
    .finally(() => {
    connection_1.con.destroy();
});
//# sourceMappingURL=migrations.js.map