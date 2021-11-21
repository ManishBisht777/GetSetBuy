const express = require("express");
const ErrorMiddleware = require("./middleware/error");
const app = express();
app.use(express.json());
// route imports
const product = require("./routes/productroutes");

app.use("/api/", product);

// middleware for error handling 
app.use(ErrorMiddleware);
module.exports = app;
