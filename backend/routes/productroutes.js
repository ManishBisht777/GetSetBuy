const express = require("express");
const {
  getallproducts,
  createProduct,
  updateproduct,
  deleteproduct,
  getproduct,
} = require("../controllers/product");

const { isauthenticated } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(isauthenticated, getallproducts);
router.route("/products/new").post(isauthenticated, createProduct);
router.route("/products/:id").put(isauthenticated, updateproduct);
router.route("/products/:id").delete(isauthenticated, deleteproduct);
router.route("/products/:id").get(getproduct);

module.exports = router;
