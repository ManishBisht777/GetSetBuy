const express = require("express");
const { registeruser, loginuser, logoutuser } = require("../controllers/user");

const router = express.Router();

router.route("/register").post(registeruser);
router.route("/login").post(loginuser);
router.route("/logout").get(logoutuser);
module.exports = router;
