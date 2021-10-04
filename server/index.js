const mongoose = require("mongoose");
const morgan = require("morgan");
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const users = require("./controllers/userController");
const files = require("./controllers/fileController");
const lessons = require("./controllers/LessonController");
const stripe = require("./controllers/StripeController");

require("dotenv").config();
require("./config.js"); // Import DB Connection
const port = process.env.PORT || 8080;

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  ssl: true,
  retryWrites: true,
  useUnifiedTopology: true,
};
if (process.env.NODE_ENV === "production") {
  mongoose.connect(uri, options).then(
    () => {
      console.log("Database connection established in prod!");
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

  app.use(express.static(path.resolve(__dirname, "..", "build")));

  //Importing all routes to prod

  app.route("/api/v1/users").get(users.listAllUsers).post(users.createNewUser);
  app
    .route("/api/v1/users/:id")
    .get(users.getOneUserByAuthId)
    .patch(users.updateUser)
    .delete(users.deleteUser);
  app.route("/api/v1/users/:id/lessons").get(lessons.getLessonsBySenpaiId);

  app
    .route("/api/v1/lessons")
    .get(lessons.listAllLessons)
    .post(lessons.createNewLesson);
  app
    .route("/api/v1/lessons/:id")
    .patch(lessons.updateLesson)
    .delete(lessons.deleteLesson);

  app.route("/api/v1/files").get(files.listAllFiles).post(files.createNewFile);
  app
    .route("/api/v1/files/:id")
    .patch(files.updateFile)
    .delete(files.deleteFile);

  app
    .route("/api/v1/create-checkout-session/:priceId/:senpaiId")
    .post(stripe.createCheckoutSession);
  app
    .route("/api/v1/create-lesson-and-price")
    .post(stripe.createLessonAndPrice);
  app.route("/api/v1/stripeLessons").get(stripe.getStripeLesson);

  app.get("*", (req, res) => {
    routes(app);
    res.sendFile(
      path.join(__dirname, "../../", "senpai", "build", "index.html")
    );
  });
  // } else {
  //   app.get("/", (req, res) => {
  //     res.send("api running");
  // });
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
