const catchAsync = require("./../utilities/catchAsync.js");
const AppError = require("./../utilities/AppError.js");
const Trademark = require("./../models/trademarks.js");

exports.createTrademark = catchAsync(async (req, res, next) => {
  req.body.details = JSON.parse(req.body.details);
  req.body.img = req.file.path;
  const trademark = await Trademark.create(req.body);
  res.status(201).json({
    status: "success",
    trademark,
  });
});

exports.getAllTrademarks = catchAsync(async (req, res, next) => {
  const trademarks = await Trademark.find({});
  res.status(200).json({
    status: "success",
    trademarks,
  });
});

exports.updateTrademark = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.img = req.file.path;
  }
  if (req.body.details != undefined) {
    req.body.details = JSON.parse(req.body.details);
  }
  const updatedTrademark = await Trademark.findByIdAndUpdate(
    req.params.trademark_id,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      updatedTrademark,
    },
  });
});

exports.deleteTrademark = catchAsync(async (req, res, next) => {
  await Trademark.findByIdAndDelete(req.params.trademark_id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
