const catchasyncerror = require("../middleware/catchasyncerror");

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

exports.processPayment = catchasyncerror(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchasyncerror(async (req, res, next) => {
  res.status(200).json({ stripeapikey: process.env.STRIPE_API_KEY });
});
