const express = require("express");
const { neworder } = require("../controllers/order");
const { isauthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/order/new").put(isauthenticated, neworder);

module.exports = router;
