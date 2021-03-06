const express = require("express");
const ErrorMiddleware = require("./middleware/error");
const app = express();
const cookieparser = require("cookie-parser");
const bodyparser = require("body-parser");
const fileupload = require("express-fileupload");
const path = require("path");

app.use(express.json());
app.use(cookieparser());
const cors = require("cors");
app.use(cors({ origin: true, optionsSuccessStatus: 200, credentials: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileupload());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// route imports
const product = require("./routes/productroutes");
const user = require("./routes/userroutes");
const order = require("./routes/orderroutes");
const payment = require("./routes/paymentroute");

app.use("/api", product);
app.use("/api", user);
app.use("/api", order);
app.use("/api", payment);
// app.use(express.static(path.join(__dirname, "../frontend/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

// middleware for error handling
app.use(ErrorMiddleware);
module.exports = app;
