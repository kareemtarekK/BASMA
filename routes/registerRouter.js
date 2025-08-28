const express = require("express");
const registerUserFunction = require("./../controllers/registerController.js");
const router = express.Router();
router.post("/", registerUserFunction.registerUser);

module.exports = router;
