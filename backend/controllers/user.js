const Errorhandler = require("../utils/errorhandler");
const catchasyncerror = require("../middleware/catchasyncerror");
const User = require("../models/usermodel");

// register a user

exports.registeruser = catchasyncerror(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample id",
      url: "url",
    },
  });

  res.status(201).json({
      success:true,
      user
  })
});
