const mongoose = require("mongoose");

const userSchema = require("./model");

require("dotenv").config();

// Import DB Connection
require("./config.js");

const morgan = require("morgan");

// require express
const express = require("express");
const path = require("path");
var cors = require("cors");
// create express app
const app = express();

//Assign MongoDB connection string to Uri and declare options settings
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@senpai.v11ar.mongodb.net/senpaidb`;
// Declare a variable named option and assign optional settings
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Connect MongoDB Atlas using mongoose connect method
const db = mongoose.connect(uri, options).then(
  () => {
    console.log("Database connection established!");
  },
  (err) => {
    {
      console.log("Error connecting Database instance due to:", err);
    }
  }
);

// Import API route
// let routes = require("./routes"); //importing route

// routes(app);
// use middleware on express app
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
// Setup logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);
// define port to run express app
const port = process.env.PORT || 5000;

// Add endpoint
app.get("/", (req, res) => {
  res.send("Welcome to our User Database");
});

//WORKING, UPDATE  MODEL TO ADD MORE DATA
app.put("/users", function (req, res) {
  let newUser = new userSchema(req.body);

  newUser.save(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send("Data inserted");
    }
  });
});

app.get("/users", async (req, res) => {
  userSchema.find(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

// Listen to server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
