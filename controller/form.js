const user = require("../model/data");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.postData = catchAsync(async (req, res, next) => {
  const data = req.body;
  console.log(data);
  if (!data) {
    return next(new appError("no data provided", 401));
  }
  await user.create(data);

  res.status(200).json({
    ok: true,
    result: "submisson was succesfull",
  });
});

exports.getData = catchAsync(async (req, res, next) => {
  const data = await user.find();
  console.log(data);
  if (!data) {
    return next(new appError("no data found", 404));
  }

  res.status(200).json({
    ok: true,
    result: data,
  });
});
