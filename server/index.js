const mongoose = require("mongoose");
const morgan = require("morgan");
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const routes = require("./routes");

require("dotenv").config();
require("./config.js"); // Import DB Connection

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  ssl: true,
  retryWrites: true,
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

mongoose.connection.once("open", () => {
  console.log("MongoDB connected!");
});

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "senpai", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("api running");
  });
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
