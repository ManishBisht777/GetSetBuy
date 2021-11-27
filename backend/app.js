const express = require("express");
const ErrorMiddleware = require("./middleware/error");
const app = express();
const cookieparser = require("cookie-parser");

app.use(express.json());
app.use(cookieparser());

// route imports
const product = require("./routes/productroutes");
const user = require("./routes/userroutes");
const order = require("./routes/orderroutes");

app.use("/api/", product);
app.use("/api/", user);
app.use("/api", order);

// middleware for error handling
app.use(ErrorMiddleware);
module.exports = app;
