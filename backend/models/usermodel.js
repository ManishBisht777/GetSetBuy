const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
  },
  email: {
    type: String,
    required: [true, "please enter your Email"],
    unique: true,
    validate: [validator.isEmail, "please enter a valid Email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "password should be less than 8 character"],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetpasswordtoken: String,
  resetpasswordexpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//jwt token

userSchema.methods.getJWTtoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// compare password

userSchema.methods.comparepassword = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};

// reset password facility

userSchema.methods.getresetpasswordtoken = function () {
  //generating token
  const resettoken = crypto.randomBytes(20).toString("hex");

  // hashing and saving resetpasswordtoken to userschema
  this.resetpasswordtoken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");

  this.resetpasswordexpire = Date.now() + 15 * 60 * 1000;

  return resettoken;
};

const User = mongoose.model("user", userSchema);
module.exports = User;
