const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const lessonSchema = new Schema({
  senpaiId: {
    type: mongoose.ObjectId,
    required: true,
  },
  kouhaiId: {
    type: mongoose.ObjectId,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model("lesson", lessonSchema);
