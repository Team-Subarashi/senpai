const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const repositorySchema = new Schema({
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("repository", repositorySchema);
