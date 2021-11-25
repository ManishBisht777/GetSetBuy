const express = require("express");
const {
  registeruser,
  loginuser,
  logoutuser,
  forgotpassword,
  resetpassword,
} = require("../controllers/user");

const router = express.Router();

router.route("/register").post(registeruser);

router.route("/login").post(loginuser);

router.route("/password/forgot").post(forgotpassword);

router.route("/password/reset/:token").put(resetpassword);

router.route("/logout").get(logoutuser);
module.exports = router;
