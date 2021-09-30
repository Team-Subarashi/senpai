const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const lessonSchema = new Schema({
  senpaiId: {
    type: mongoose.ObjectId,
    required: true,
  },
  kouhaiId: {
    type: mongoose.ObjectId,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model("lesson", lessonSchema);
