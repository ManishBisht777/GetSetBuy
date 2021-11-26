const express = require("express");
const {
  registeruser,
  loginuser,
  logoutuser,
  forgotpassword,
  resetpassword,
  getuser,
  updatepassword,
  updateuser,
} = require("../controllers/user");

const { isauthenticated } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registeruser);

router.route("/login").post(loginuser);

router.route("/password/forgot").post(forgotpassword);

router.route("/password/reset/:token").put(resetpassword);

router.route("/me").get(isauthenticated, getuser);

router.route("/logout").get(logoutuser);

router.route("/password/update").put(isauthenticated, updatepassword);

router.route("/me/update").put(isauthenticated, updateuser);

module.exports = router;
