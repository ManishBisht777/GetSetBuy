const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt= require("bcryptjs")

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
  resetpasswordtoken: String,
  resetpasswordexpire: Date,
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
    {
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
})
const User = mongoose.model("user", userSchema);
module.exports = User;
