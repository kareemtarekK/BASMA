const AppError = require("./../utilities/AppError.js");
const catchAsync = require("./../utilities/catchAsync.js");
const Product = require("./../models/product.js");
exports.createProduct = catchAsync(async (req, res, next) => {
  const imgUrls = req.files.map((file) => file.path);
  req.body.img = imgUrls;
  const newProduct = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      newProduct,
    },
  });
});
