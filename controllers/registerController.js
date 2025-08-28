const jsonwebtoken = require("jsonwebtoken");
const Users = require("./../models/registerModel.js");
const Admin = require("./../models/registerAdmin.js");
const catchAsync = require("./../utilities/catchAsync.js");

// function to create token
const createToken = (user) => {
  const token = jsonwebtoken.sign({ id: user._id }, process.env.SECRET_KET, {
    expiresIn: process.env.EXPIRESIN,
  });
  return token;
};
exports.createToken = createToken;

// function to register normal user
exports.registerUser = catchAsync(async (req, res, next) => {
  const registeredUser = await Users.create(req.body);
  const token = createToken(registeredUser);
  console.log(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user: registeredUser,
      token,
    },
  });
});

// function to register admin
exports.registerAdmin = catchAsync(async (req, res, next) => {
  const admin = await Admin.create(req.body);
  const token = createToken(admin);
  res.status(201).json({
    status: "success",
    data: {
      admin,
      token,
    },
  });
});
