const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const adminRegister = new mongoose.Schema({
  role: {
    type: String,
    default: "admin",
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "please provide valid email",
    },
    required: [true, "please provide your email"],
  },
  password: {
    type: String,
    required: [true, "please provide your password"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "please provide your password confirm"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "password and passwordConfirm should be matched",
    },
  },
  phonenumber: {
    countryCode: {
      type: String,
      required: [true, "please provide country code"],
    },
    phone: {
      type: String,
      required: [true, "plesae provide your phone"],
    },
  },
  // verificationCode: String,
  // statusCode: {
  //   type: Boolean,
  //   default: false,
  // },
  // codeExpired: Date,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// pre save hook to encrypt password
adminRegister.pre("save", async function (next) {
  const encryptedPassword = await bcryptjs.hash(this.password, 12);
  this.password = encryptedPassword;
  this.passwordConfirm = undefined;
  next();
});

// instance method to ensure entered password is equal to
adminRegister.methods.correctPassword = async (inputPassword, password) => {
  return await bcryptjs.compare(inputPassword, password);
};

const Admin = mongoose.model("Admin", adminRegister);

module.exports = Admin;
