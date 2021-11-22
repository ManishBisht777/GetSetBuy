const express = require("express");
const ErrorMiddleware = require("./middleware/error");
const app = express();
app.use(express.json());
// route imports
const product = require("./routes/productroutes");
const user = require("./routes/userroutes");

app.use("/api/", product);
app.use("/api/", user);
// middleware for error handling
app.use(ErrorMiddleware);
module.exports = app;
