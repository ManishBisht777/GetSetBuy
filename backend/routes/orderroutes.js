const express = require("express");
const {
  neworder,
  getsingleorder,
  myorders,
  getallorders,
  updateorder,
  deleteorder,
} = require("../controllers/order");
const { isauthenticated, authorizedrole } = require("../middleware/auth");
const router = express.Router();

router.route("/order/new").post(isauthenticated, neworder);

router.route("/order/:id").get(isauthenticated, getsingleorder);

router.route("/myorder").get(isauthenticated, myorders);

router
  .route("/allorders")
  .get(isauthenticated, authorizedrole("admin"), getallorders);

router
  .route("/order/:id")
  .put(isauthenticated, authorizedrole("admin"), updateorder)
  .delete(isauthenticated, authorizedrole("admin"), deleteorder);

module.exports = router;
