// Import mongoose
const mongoose = require("mongoose");
// Declare schema and assign Schema class
const Schema = mongoose.Schema;
// Create Schema Instance and add schema propertise
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});
// create and export model
module.exports = mongoose.model("user", userSchema);
