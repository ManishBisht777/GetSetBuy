const express = require("express");
const { registeruser } = require("../controllers/user");


const router = express.Router();


router.route("/register").post(registeruser);


module.exports=router;