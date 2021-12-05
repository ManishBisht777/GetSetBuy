const express = require("express");
const ErrorMiddleware = require("./middleware/error");
const app = express();
const cookieparser = require("cookie-parser");
const bodyparser = require("body-parser");
const fileupload = require("express-fileupload");

app.use(express.json());
app.use(cookieparser());
const cors = require("cors");
app.use(cors({ origin: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileupload());

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
