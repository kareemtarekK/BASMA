const express = require("express");
const cors = require("cors");
const registerRouter = require("./routes/registerRouter.js");
const registerAdminRouter = require("./routes/registerAdminRouter.js");
const loginAdminRouter = require("./routes/loginAdminRouter.js");
const loginUserRouter = require("./routes/loginUserRouter.js");
const productRouter = require("./routes/productRouter.js");
const langsRouter = require("./routes/langsRouter.js");
const trademarkRouter = require("./routes/trademarkRouter.js");
const serviceRouter = require("./routes/serviceRouter.js");
// const verifyRouter = require("./routes/verifyRouter.js");
const globalError = require("./utilities/globalErrorHandlingMiddleware.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/register", registerRouter);
app.use("/api/v1/admin/register", registerAdminRouter);
app.use("/api/v1/admin/login", loginAdminRouter);
app.use("/api/v1/user/login", loginUserRouter);
// app.use("/api/v1/verify", verifyRouter);
app.use("/api/v1/admin/products", productRouter);
app.use("/api/v1/admin/langs", langsRouter);
app.use("/api/v1/admin/trademarks", trademarkRouter);
app.use("/api/v1/admin/services", serviceRouter);

app.use("/", (req, res, next) => {
  res.send("welcome✅");
});

app.all("*", (req, res, next) => {
  const err = new Error(`${req.originalUrl} not found on server 💥`);
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});

app.use(globalError.globalErrorHandlingMiddleware);
module.exports = app;
