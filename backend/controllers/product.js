const Product = require("../models/productmodel");
const Errorhandler = require("../utils/errorhandler");
const catchasyncerror = require("../middleware/catchasyncerror");
const Apifeatures = require("../utils/features");

// create product <---admin only --->

exports.createProduct = catchasyncerror(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// get all products

exports.getallproducts = catchasyncerror(async (req, res, next) => {
  const resultperpage = 10;
  const productcount = await Product.countDocuments();
  const apifeature = new Apifeatures(Product.find(), req.query)
    .search()
    .filter()
    .panigation(resultperpage);

  const products = await apifeature.query;
  res.status(200).json({
    success: true,
    products,
    productcount,
  });
});

// get product details
exports.getproduct = catchasyncerror(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("product not found", 404));
  }

  res.status(200).json({
    sucess: true,
    product,
  });
});

// update products <---admin only--->

exports.updateproduct = catchasyncerror(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("product not found", 404));
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
});

// delete product <---admin only--->

exports.deleteproduct = catchasyncerror(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("product not found", 404));
  }

  await Product.deleteOne();
  res.status(200).json({
    sucess: true,
  });
});

// create review or update review
exports.createreview = catchasyncerror(async (req, res, next) => {
  const { rating, comment, productid } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productid);

  console.log(product);
  const isreviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isreviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.noofrewiew = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
