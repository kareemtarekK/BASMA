const mongoose = require("mongoose");
const langsSchema = new mongoose.Schema({
  name: {
    type: String,
    reauired: [true, "enter language name"],
  },
  code: {
    type: String,
    required: [true, "enter code for language"],
  },
  direction: {
    type: String,
    required: [true, "enter direction of language"],
  },
});

const Language = mongoose.model("Language", langsSchema);

module.exports = Language;
