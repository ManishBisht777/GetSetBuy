const Product = require("../models/productmodel");
const Errorhandler = require("../utils/errorhandler");
const catchasyncerror = require("../middleware/catchasyncerror");
const Apifeatures = require("../utils/features");
const cloudinary = require("cloudinary");

// create product <---admin only --->

exports.createProduct = catchasyncerror(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    let result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
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
    .filter();

  let products = await apifeature.query.clone();
  let filterproductscount = products.length;

  apifeature.panigation(resultperpage);

  products = await apifeature.query;
  res.status(200).json({
    success: true,
    products,
    productcount,
    resultperpage,
    filterproductscount,
  });
});

// get all product (admin)

exports.getallproductsadmin = catchasyncerror(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
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

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  // destroy old image from cloudinary
  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      let result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  if (!product) {
    return next(new Errorhandler("product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runvalidator: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// delete product <---admin only--->

exports.deleteproduct = catchasyncerror(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("product not found", 404));
  }

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await Product.deleteOne();
  res.status(200).json({
    success: true,
  });
});

// create review or update review
exports.createreview = catchasyncerror(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
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

// get all reviews of single product

exports.getproductreviews = catchasyncerror(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new Errorhandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete review (admin)

exports.deleteproductreview = catchasyncerror(async (req, res, next) => {
  // find product
  const product = await Product.findById(req.query.productid);

  if (!product) {
    return next(new Errorhandler("Product not found", 404));
  }

  // delete review with given id
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  // update rating and no of reviews and reviews
  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numofreviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productid,
    {
      reviews,
      ratings,
      numofreviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
