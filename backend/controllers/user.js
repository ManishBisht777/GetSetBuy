const Errorhandler = require("../utils/errorhandler");
const catchasyncerror = require("../middleware/catchasyncerror");
const User = require("../models/usermodel");
const sendtoken = require("../utils/jwttoken");

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

  sendtoken(user, 201, res);
});

// login a user

exports.loginuser = catchasyncerror(async (req, res, next) => {
  const { email, password } = req.body;

  console.log(email, password);
  // check for email and password

  if (!email || !password) {
    return next(new Errorhandler("Please enter Email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  console.log(user);
  // if user-email not found
  if (!user) {
    return next(
      new Errorhandler("Please login using correct credentials", 401)
    );
  }

  const isPasswordMatched = await user.comparepassword(password);

  console.log(isPasswordMatched);
  console.log("hello");
  // if password misatched
  if (!isPasswordMatched) {
    return next(new Errorhandler("Invalid email or password", 401));
  }
  console.log("hello");

  sendtoken(user, 200, res);
});
