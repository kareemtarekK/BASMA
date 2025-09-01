const express = require("express");
const serviceController = require("./../controllers/serviceController.js");
const serviceRouter = express.Router();
serviceRouter
  .route("/")
  .post(serviceController.createService)
  .get(serviceController.getAllServices);

serviceRouter
  .route("/:service_id")
  .patch(serviceController.updateService)
  .delete(serviceController.deleteService);

module.exports = serviceRouter;
