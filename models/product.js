const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  arabicName: {
    type: String,
    required: [true, "enter product arabic name."],
    trim: true,
  },
  englishName: {
    type: String,
    required: [true, "enter product english name."],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "enter product price"],
  },
  oldPrice: {
    type: Number,
    required: [true, "enter product old price."],
  },
  quantity: {
    type: Number,
    required: [true, "enter product quantity."],
  },
  img: [String],
  trademark: {
    type: String,
    required: [true, "enter product trademark"],
  },
  is_deleted: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
