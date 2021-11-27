const Order = require("../models/ordermodel");
const Errorhandler = require("../utils/errorhandler");
const catchasyncerror = require("../middleware/catchasyncerror");
const Product = require("../models/productmodel");

// Create new Order

exports.neworder = catchasyncerror(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get single order

exports.getsingleorder = catchasyncerror(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new Errorhandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders

exports.myorders = catchasyncerror(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all order  --> admin

exports.getallorders = catchasyncerror(async (req, res, next) => {
  const totalorders = await Order.countDocuments();
  const orders = await Order.find().populate("user", "name email");

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    totalorders,
    orders,
  });
});

// update order

exports.updateorder = catchasyncerror(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new Errorhandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "delivered") {
    return next(new Errorhandler("You have already delivered this order", 400));
  }

  if (req.body.status === "shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin

exports.deleteorder = catchasyncerror(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new Errorhandler("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
