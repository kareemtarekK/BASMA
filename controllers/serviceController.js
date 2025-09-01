const catchAsync = require("./../utilities/catchAsync.js");
const AppError = require("./../utilities/AppError.js");
const Service = require("./../models/service.js");
const { json } = require("express");
exports.createService = catchAsync(async (req, res, next) => {
  //   req.body.details = JSON.parse(req.body.details);
  const service = await Service.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      service,
    },
  });
});

async function getServicesTree() {
  const services = await Service.find().lean();

  const servicesMap = services.map((s) => ({ ...s, _id: s._id.toString() }));

  const map = {};
  servicesMap.forEach((s) => {
    s.children = [];
    map[s._id] = s;
  });

  const tree = [];
  servicesMap.forEach((s) => {
    if (s.parent_id !== "0" && map[s.parent_id]) {
      map[s.parent_id].children.push(s);
    } else {
      tree.push(s);
    }
  });

  return tree;
}

exports.getAllServices = catchAsync(async (req, res, next) => {
  const tree = await getServicesTree();

  res.status(200).json({
    status: "success",
    date: tree,
  });
});

exports.updateService = catchAsync(async (req, res, next) => {
  const updatedService = await Service.findByIdAndUpdate(
    req.params.service_id,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );
  res.status(200).json({
    status: "success",
    updatedService,
  });
});

exports.deleteService = catchAsync(async (req, res, next) => {
  await Service.findByIdAndDelete(req.params.service_id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
