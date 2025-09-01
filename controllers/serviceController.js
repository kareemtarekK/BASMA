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

function transformIds(obj) {
  if (Array.isArray(obj)) {
    return obj.map(transformIds);
  } else if (obj && typeof obj === "object") {
    const newObj = {};
    for (let key in obj) {
      if (key === "_id") {
        newObj["id"] = obj[key].toString(); // تحويل _id إلى id
      } else if (Array.isArray(obj[key]) || typeof obj[key] === "object") {
        newObj[key] = transformIds(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  }
  return obj;
}

exports.getAllServices = catchAsync(async (req, res, next) => {
  const tree = await getServicesTree();

  const cleanTree = transformIds(tree);

  console.log(tree);
  res.status(200).json({
    status: "success",
    data: cleanTree,
  });
});

async function getServiceTreeById(serviceId) {
  const service = await Service.findById(serviceId).lean();

  if (!service) {
    return null;
  }

  service._id = service._id.toString();

  const children = await Service.find({ parent_id: service._id }).lean();

  service.children = await Promise.all(
    children.map(async (child) => {
      return await getServiceTreeById(child._id.toString());
    })
  );

  return service;
}
exports.updateService = catchAsync(async (req, res, next) => {
  const updatedService = await Service.findByIdAndUpdate(
    req.params.service_id,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );

  const cleanTree = await getServiceTreeById(updatedService._id);

  const service = transformIds(cleanTree);
  res.status(200).json({
    status: "success",
    service,
  });
});

exports.getService = catchAsync(async (req, res, next) => {
  const cleanTree = await getServiceTreeById(req.params.service_id);

  const service = transformIds(cleanTree);

  res.status(200).json({
    status: "success",
    service,
  });
});

exports.deleteService = catchAsync(async (req, res, next) => {
  await Service.findByIdAndDelete(req.params.service_id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
