const express = require("express");
const productController = require("./../controllers/productsControllers.js");
const upload = require("./../controllers/upload.js");
const productRouter = express.Router();
productRouter
  .route("/")
  .post(upload.array("img", 10), productController.createProduct);

module.exports = productRouter;
