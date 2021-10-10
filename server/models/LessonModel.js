const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const lessonSchema = new Schema({
  senpaiId: {
    type: mongoose.ObjectId,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  title: {
    type: String
  },
  kouhaiId: {
    type: mongoose.ObjectId,
  },
  priceId: {
    type: String,
  },
  productId: {
    type: String,
  },
  vonageSessionId: {
    type: String,
  },
});

module.exports = mongoose.model("lesson", lessonSchema);
