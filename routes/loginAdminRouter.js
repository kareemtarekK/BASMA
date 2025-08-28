const express = require("express");
const loginController = require("./../controllers/loginControllers.js");
const loginAdminRouter = express.Router();
loginAdminRouter.post("/", loginController.loginAdmin);

module.exports = loginAdminRouter;
