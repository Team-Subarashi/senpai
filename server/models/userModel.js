const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rates: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
