const AppError = require("./../utilities/AppError.js");
const catchAsync = require("./../utilities/catchAsync.js");
const Product = require("./../models/product.js");

// add new product
exports.createProduct = catchAsync(async (req, res, next) => {
  const imgUrls = req.files.map((file) => file.path);
  req.body.imgs = imgUrls;
  //   console.log(req.body.details);
  req.body.details = JSON.parse(req.body.details);
  console.log(req.body.details);
  const newProduct = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      newProduct,
    },
  });
});

// get all products
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({
    status: "success",
    data: {
      length: products.length,
      products,
    },
  });
});

// update product
exports.updateProduct = catchAsync(async (req, res, next) => {
  const productBeforeUpdate = await Product.findById(req.params.product_id);
  if (req.files.length > 0) {
    const imgUrls = req.files.map((file) => file.path);
    req.body.imgs = imgUrls;
  }
  console.log(req.files);
  if (req.body.details != undefined) {
    req.body.details = JSON.parse(req.body.details);
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.product_id,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );
  res.status(200).json({
    status: "success",
    productBeforeUpdate,
    updatedProduct,
  });
});

// delete product
exports.deleteProduct = catchAsync(async (req, res, next) => {
  if (req.files) {
    const imgUrls = req.files.map((file) => file.path);
    req.body.imgs = imgUrls;
  }
  const deletedProduct = await Product.findByIdAndUpdate(
    req.params.product_id,
    { is_deleted: 1 },
    {
      runValidators: true,
      next: true,
    }
  );
  res.status(200).json({
    status: "update is_delete field to 1",
    deletedProduct,
  });
});
