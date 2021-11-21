const Product = require("../models/productmodel");

// create product <---admin only --->

exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

// get all products

exports.getallproducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

// get product details
exports.getproduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    res.status(500).json({
      success: false,
      message: "product not found",
    });
  }

  res.status(200).json({
    sucess: true,
    product,
  });
};

// update products <---admin only--->

exports.updateproduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    res.status(500).json({
      sucess: false,
      message: "product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runvalidator: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    sucess: true,
    product,
  });
};

// delete product <---admin only--->

exports.deleteproduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    res.status(500).json({
      sucess: false,
      message: "product not found",
    });
  }

  await Product.deleteOne();
  res.status(200).json({
    sucess: true,
  });
};
