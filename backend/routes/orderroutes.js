const express = require("express");
const {
  neworder,
  getsingleorder,
  myorders,
  getallorders,
} = require("../controllers/order");
const { isauthenticated, authorizedrole } = require("../middleware/auth");
const router = express.Router();

router.route("/order/new").put(isauthenticated, neworder);

router
  .route("/order/:id")
  .get(isauthenticated, authorizedrole("admin"), getsingleorder);

router.route("/myorder").get(isauthenticated, myorders);

router
  .route("/allorders")
  .get(isauthenticated, authorizedrole("admin"), getallorders);

module.exports = router;
