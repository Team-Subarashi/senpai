const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fileSchema = new Schema({
  js: {
    type: String,
    required: false,
  },
  html: {
    type: String,
    required: false,
  },
  css: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("file", fileSchema);
