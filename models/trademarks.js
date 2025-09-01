const mongoose = require("mongoose");
const trademarkSchema = new mongoose.Schema({
  details: [
    {
      name: {
        type: String,
        required: [true, "enter name of trademark"],
      },
      code: {
        type: String,
        required: [true, "eneter code of trademark"],
      },
    },
  ],
  img: {
    type: String,
    required: [true, "eneter img of trademark"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Trademark = mongoose.model("Trademark", trademarkSchema);
module.exports = Trademark;
