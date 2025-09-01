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
        required: [true, "enter code en or ar"],
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
    ref: "Trademark",
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "enter product trademark"],
    ref: "Service",
  },
  is_deleted: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
