const express = require("express");
const loginController = require("./../controllers/loginControllers.js");
const loginUserRouter = express.Router();
loginUserRouter.post("/", loginController.loginUser);

module.exports = loginUserRouter;
