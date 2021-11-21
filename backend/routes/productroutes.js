const express=require("express");
const { getallproducts } = require("../controllers/product");

const router=express.Router();

router.route("/products").get(getallproducts);


module.exports=router

