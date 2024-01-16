const express = require("express");
const app = express();

const cusRouter = require("./router/cus-route");
// const prodRouter = require("./router/prod-route");
app.use(express.json());
//routing througth /api route
app.use("/api", cusRouter);
//app.use("/api", prodRouter);

module.exports = app;
