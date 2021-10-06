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
const port = process.env.PORT || 8080;

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  ssl: true,
  retryWrites: true,
  useUnifiedTopology: true,
};

mongoose.connect(uri, options).then(
  () => {
    console.log("Connection established!");
    routes(app);
  },
  (err) => {
    {
      console.log("Error connecting Database instance due to:", err);
    }
  }
);

mongoose.connection.once("open", () => {
  console.log("MongoDB has been connected to");
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
  app.use(express.static(path.resolve(__dirname, "..", "build")));

  //Importing all routes to prod

  app.route("/api/v1/users").get(users.listAllUsers).post(users.createNewUser);
  app
    .route("/api/v1/users/:id")
    .get(users.getOneUserByAuthId)
    .patch(users.updateUser)
    .delete(users.deleteUser);
  app.route("/api/v1/users/:id/lessons").get(lessons.getUserLessons);
  app.route("/senpai/:id/lessons").get(lessons.getLessonsBySenpaiId);
  app.route("/kouhai/:id/lessons").get(lessons.getLessonsByKouhaiId);

  app
    .route("/lessons")
    .get(lessons.listAllLessons)
    .post(lessons.createNewLesson);
  app
    .route("/lessons/:id")
    .patch(lessons.updateLesson)
    .delete(lessons.deleteLesson);

  app.route("/files").get(files.listAllFiles).post(files.createNewFile);
  app.route("/files/:id").patch(files.updateFile).delete(files.deleteFile);

  app
    .route("/create-checkout-session/:priceId/:senpaiId")
    .post(stripe.createCheckoutSession);
  app.route("/create-lesson-and-price").post(stripe.createLessonAndPrice);
  app.route("/stripeLessons").get(stripe.getStripeLesson);

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
