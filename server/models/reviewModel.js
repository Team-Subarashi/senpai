const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  kohaiId: {
    type: String,
    required: true,
  },
  senpaiId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("review", reviewSchema);
