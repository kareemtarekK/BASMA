const express = require("express");
const registerUserFunction = require("./../controllers/registerController.js");
const registerAdminRouter = express.Router();
registerAdminRouter.post("/", registerUserFunction.registerAdmin);
module.exports = registerAdminRouter;
