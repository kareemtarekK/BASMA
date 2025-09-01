const catchAsync = require("./../utilities/catchAsync.js");
const AppError = require("./../utilities/AppError.js");
const Language = require("./../models/langs.js");

exports.createLanguage = catchAsync(async (req, res, next) => {
  const language = await Language.create(req.body);
  res.status(201).json({
    status: "success",
    language,
  });
});

exports.getAllLangs = catchAsync(async (req, res, next) => {
  const languages = await Language.find();
  res.status(200).json({
    status: "success",
    data: {
      languages,
    },
  });
});

exports.getOneLang = catchAsync(async (req, res, next) => {
  const language = await Language.findById(req.params.language_id);
  res.status(200).json({
    status: "success",
    data: {
      language,
    },
  });
});

exports.updateLanguage = catchAsync(async (req, res, next) => {
  const updatedLanguage = await Language.findByIdAndUpdate(
    req.params.language_id,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      updatedLanguage,
    },
  });
});

exports.deleteLanguage = catchAsync(async (req, res, next) => {
  await Language.findByIdAndDelete(req.params.language_id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
