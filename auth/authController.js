const crypto = require("crypto");
const catchAsync = require("./../utilities/catchAsync.js");
const AppError = require("./../utilities/AppError.js");
const Admin = require("./../models/registerAdmin.js");
const registerController = require("./../controllers/registerController.js");

exports.verification = catchAsync(async (req, res, next) => {
  const { code } = req.body;
  const encryptedCode = crypto.createHash("sha256").update(code).digest("hex");
  const admin = await Admin.findOne({
    verificationCode: encryptedCode,
    codeExpired: { $gt: Date.now() },
  });
  if (!admin) return next(new AppError("invalid code or expired", 401));
  admin.statusCode = true;
  admin.verificationCode = undefined;
  admin.codeExpired = undefined;
  await admin.save({ validateBeforeSave: false });
  const token = registerController.createToken(adminUser);

  res.status(200).json({
    status: "success verified ✅",
    verification: true,
    token,
  });
});
