const mongoose = require("mongoose");
const registerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "please provide your fullname !"],
  },
  phonenumber: {
    countryCode: {
      type: String,
      required: [true, "please choose your country code"],
      enum: ["+966", "+965", "+971", "+973", "+968", "+974"],
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "please provide your phone number"],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Users = mongoose.model("User", registerSchema);
module.exports = Users;
