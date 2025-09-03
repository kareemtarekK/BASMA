const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./index.js");

const connectionString = process.env.mongoDbString;
const PORT = process.env.PORT || 5000;
mongoose
  .connect(connectionString)
  .then(() => console.log("connect to database ✅"))
  .catch((err) => console.log(err));

app.listen(PORT, "0.0.0.0", () => {
  console.log("running app ✅");
});
