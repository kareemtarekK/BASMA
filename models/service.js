const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema({
  details: [
    {
      name: {
        type: String,
        required: [true, "enter name of service"],
      },
      code: {
        type: String,
        required: [true, "enter code of your service"],
      },
    },
  ],
  parent_id: {
    type: String,
    default: "0",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
