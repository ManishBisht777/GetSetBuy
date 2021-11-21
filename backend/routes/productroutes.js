const express = require("express");
const { getallproducts, createProduct ,updateproduct, deleteproduct, getproduct} = require("../controllers/product");

const router = express.Router();

router.route("/products").get(getallproducts);
router.route("/products/new").post(createProduct);
router.route("/products/:id").put(updateproduct);
router.route("/products/:id").delete(deleteproduct);
router.route("/products/:id").get(getproduct);

module.exports = router;
