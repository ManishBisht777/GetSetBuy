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
  getalluser,
  getsingleuser,
  updaterole,
  deleteuser,
} = require("../controllers/user");

const { isauthenticated, authorizedrole } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registeruser);

router.route("/login").post(loginuser);

router.route("/password/forgot").post(forgotpassword);

router.route("/password/reset/:token").put(resetpassword);

router.route("/me").get(isauthenticated, getuser);

router.route("/logout").get(logoutuser);

router.route("/password/update").put(isauthenticated, updatepassword);

router.route("/me/update").put(isauthenticated, updateuser);

router
  .route("/admin/users")
  .get(isauthenticated, authorizedrole("admin"), getalluser);

router
  .route("/admin/user/:id")
  .get(isauthenticated, authorizedrole("admin"), getsingleuser)
  .put(isauthenticated, authorizedrole("admin"), updaterole)
  .delete(isauthenticated, authorizedrole("admin"), deleteuser);

module.exports = router;
