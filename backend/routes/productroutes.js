const express = require("express");
const {
  getallproducts,
  createProduct,
  updateproduct,
  deleteproduct,
  getproduct,
  createreview,
  getproductreviews,
  deleteproductreview,
  getallproductsadmin,
} = require("../controllers/product");

const { isauthenticated, authorizedrole } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getallproducts);

router
  .route("/admin/products")
  .get(isauthenticated, authorizedrole("admin"), getallproductsadmin);

router
  .route("/admin/product/new")
  .post(isauthenticated, authorizedrole("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isauthenticated, authorizedrole("admin"), updateproduct);

router
  .route("/admin/product/:id")
  .delete(isauthenticated, authorizedrole("admin"), deleteproduct);

router.route("/product/:id").get(getproduct);

router.route("/review").put(isauthenticated, createreview);

router
  .route("/reviews")
  .get(getproductreviews)
  .delete(isauthenticated, deleteproductreview);

module.exports = router;
