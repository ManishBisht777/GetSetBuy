const express = require("express");
const ErrorMiddleware = require("./middleware/error");
const app = express();
const cookieparser = require("cookie-parser");
const bodyparser = require("body-parser");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");

app.use(express.json());
app.use(cookieparser());
const cors = require("cors");
app.use(cors({ origin: true, optionsSuccessStatus: 200, credentials: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileupload());

// config
dotenv.config({ path: "backend/config/config.env" });

// route imports
const product = require("./routes/productroutes");
const user = require("./routes/userroutes");
const order = require("./routes/orderroutes");
const payment = require("./routes/paymentroute");

app.use("/api/", product);
app.use("/api/", user);
app.use("/api/", order);
app.use("/api/", payment);

// middleware for error handling
app.use(ErrorMiddleware);
module.exports = app;
