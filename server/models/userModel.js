const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  authId: {
    type: String,
    required: true,
  },
  isSenpai: {
    type: Boolean,
    default: true,
  },
  rates: {
    type: String,
  },
  category: {
    type: [String],
  },
  bio: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
