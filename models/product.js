const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  details: [
    {
      name: {
        type: String,
        required: [true, "enter product arabic name."],
      },
      code: {
        type: String,
        default: "ar",
      },
    },
    {
      name: {
        type: String,
        required: [true, "enter product english name."],
      },
      code: {
        type: String,
        default: "en",
      },
    },
  ],
  price: {
    type: Number,
    required: [true, "enter product price"],
  },
  old_price: {
    type: Number,
    required: [true, "enter product old price."],
  },
  quantity: {
    type: Number,
    required: [true, "enter product quantity."],
  },
  imgs: [String],
  trademark_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "enter product trademark"],
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "enter product trademark"],
  },
  is_deleted: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
