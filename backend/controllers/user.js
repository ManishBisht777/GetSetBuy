const Errorhandler = require("../utils/errorhandler");
const catchasyncerror = require("../middleware/catchasyncerror");
const User = require("../models/usermodel");
const sendtoken = require("../utils/jwttoken");
const sendmail = require("../utils/sendmail");
const crypto = require("crypto");

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

  // check for email and password

  if (!email || !password) {
    return next(new Errorhandler("Please enter Email and password", 400));
  }

  console.log(email, password);
  const user = await User.findOne({ email }).select("+password");

  // if user-email not found
  if (!user) {
    return next(
      new Errorhandler("Please login using correct credentials", 401)
    );
  }

  const isPasswordMatched = await user.comparepassword(password);

  // if password misatched
  if (!isPasswordMatched) {
    return await next(new Errorhandler("Invalid email or password", 401));
  }

  sendtoken(user, 200, res);
});

// logout a user

exports.logoutuser = catchasyncerror(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httponly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged out",
  });
});

// forgot password

exports.forgotpassword = catchasyncerror(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new Errorhandler("user not found", 404));
  }

  // get password reset token

  var passwordresettoken = user.getresetpasswordtoken();

  await user.save({ validateBeforeSave: false });

  const resetpasswordurl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/reset/${passwordresettoken}`;

  const message = `your paswword reset token is : \n\n ${resetpasswordurl} \n\n if you didnt request it then please ignore`;

  console.log(passwordresettoken);
  try {
    await sendmail({
      email: user.email,
      subject: `password recovery mail`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `email sent to ${user.email}successfully`,
    });
  } catch (error) {
    user.resetpasswordtoken = undefined;
    user.resetpasswordexpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new Errorhandler(error.message, 500));
  }
});

// reset password

exports.resetpassword = catchasyncerror(async (req, res, next) => {
  // creating token hash
  const resetpasswordtoken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetpasswordtoken,
    resetpasswordexpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new Errorhandler("reset password token is invalid or expired", 400)
    );
  }

  if (req.body.password != req.body.confirmpassword) {
    return next(new Errorhandler("password doesnt match", 400));
  }

  user.password = req.body.password;
  user.resetpasswordtoken = undefined;
  user.resetpasswordexpire = undefined;

  await user.save();
  sendtoken(user, 200, res);
});

//get user details

exports.getuser = catchasyncerror(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update user password
exports.updatepassword = catchasyncerror(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparepassword(req.body.oldpassword);

  // if password misatched
  if (!isPasswordMatched) {
    return await next(new Errorhandler("old password is incorrect", 401));
  }

  if (req.body.newpassword != req.body.confirmpassword) {
    return await next(new Errorhandler("paswword does not match", 401));
  }

  user.password = req.body.newpassword;

  user.save();
  sendtoken(user, 200, res);
});

exports.updateuser = catchasyncerror(async (req, res, next) => {
  const newdata = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newdata, {
    runValidators: true,
    new: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});
