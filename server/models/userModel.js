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
  avatar: {
    type: String,
    default: "https://t3.ftcdn.net/jpg/00/64/67/80/240_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
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
