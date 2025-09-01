const express = require("express");
const trademarkController = require("./../controllers/trademarksController.js");
const upload = require("./../controllers/upload.js");
const trademarkRouter = express.Router();
trademarkRouter
  .route("/")
  .post(upload.single("img"), trademarkController.createTrademark)
  .get(trademarkController.getAllTrademarks);
trademarkRouter
  .route("/:trademark_id")
  .patch(upload.single("img"), trademarkController.updateTrademark)
  .delete(trademarkController.deleteTrademark);

module.exports = trademarkRouter;
