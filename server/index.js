const mongoose = require("mongoose");
const userSchema = require("./model");
const morgan = require("morgan");
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const routes = require('./routes');

require("dotenv").config();
require("./config.js"); // Import DB Connection

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@senpai.v11ar.mongodb.net/senpaidb`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(uri, options).then(
  () => {
    console.log("Database connection established!");
    routes(app);
  },
  (err) => {
    {
      console.log("Error connecting Database instance due to:", err);
    }
  }
);



app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});