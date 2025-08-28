const crypto = require("crypto");
const { Vonage } = require("@vonage/server-sdk");
const Admin = require("./../models/registerAdmin.js");
const Users = require("./../models/registerModel.js");
const registerController = require("./registerController.js");
const catchAsync = require("./../utilities/catchAsync.js");
const AppError = require("./../utilities/AppError.js");

const vonage = new Vonage({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

const opt = Math.floor(100000 + Math.random() * 900000);

// login admin
exports.loginAdmin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("email and password are required 💥 ", 404));

  const adminUser = await Admin.findOne({ email });
  if (
    !adminUser ||
    !(await adminUser.correctPassword(password, adminUser.password))
  )
    return next(new AppError("email and password is not correct 💥", 400));
  const { countryCode, phone } = adminUser.phonenumber;
  const number = countryCode + phone;
  console.log(number);

  const r = await vonage.sms.send({
    to: number,
    from: "elmotakamel",
    text: `verify your account using verification code ${opt}`,
  });
  // console.log(r);
  const encryptedCode = crypto
    .createHash("sha256")
    .update(opt.toString())
    .digest("hex");
  adminUser.verificationCode = encryptedCode;
  adminUser.codeExpired = Date.now() + 5 * 60 * 1000;
  await adminUser.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    message:
      "you are logged in successfully and sent verification code to your number ✅",
  });
});

// login user
exports.loginUser = catchAsync(async (req, res, next) => {
  let token;
  const { phonenumber } = req.body;
  const { countryCode, phone } = phonenumber;
  if (!countryCode || !phone)
    return next(
      new AppError("please provide countryCode and phone number 💥", 400)
    );

  const user = await Users.findOne({
    "phonenumber.countryCode": countryCode,
    "phonenumber.phone": phone,
  });
  if (!user)
    return next(new AppError("there is no user with this phonenumber", 404));

  if (user) {
    token = registerController.createToken(user);

    res.status(200).json({
      status: "success",
      message: "you are logged in successfully ✅",
      token,
    });
  }
});
