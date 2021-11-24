const express = require("express");
const {
  getallproducts,
  createProduct,
  updateproduct,
  deleteproduct,
  getproduct,
} = require("../controllers/product");

const { isauthenticated, authorizedrole } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getallproducts);

router
  .route("/products/new")
  .post(isauthenticated, authorizedrole("admin"), createProduct);

router
  .route("/products/:id")
  .put(isauthenticated, authorizedrole("admin"), updateproduct);

router
  .route("/products/:id")
  .delete(isauthenticated, authorizedrole("admin"), deleteproduct);

router.route("/products/:id").get(getproduct);

module.exports = router;
