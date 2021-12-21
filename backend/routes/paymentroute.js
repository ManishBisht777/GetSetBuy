const express = require("express");
const router = express.Router();

const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentcontroler");

const { isauthenticated } = require("../middleware/auth");

router.route("/payment/process").post(isauthenticated, processPayment);

router.route("/stripeapikey").get(isauthenticated, sendStripeApiKey);

module.exports = router;
