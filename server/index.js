const mongoose = require("mongoose");
const morgan = require("morgan");
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const { Server } = require("socket.io");
const routes = require("./routes");
const http = require("http");
const users = require("./controllers/userController");
const files = require("./controllers/fileController");
const lessons = require("./controllers/LessonController");
const stripe = require("./controllers/StripeController");
const messages = require("./controllers/MessageController");
const vonage = require("./controllers/vonageController");

require("dotenv").config();

let port;
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT;
} else {
  port = 8080;
}

const server = http.createServer(app);

// app.get("/", (req, res) => {
//   res.send("<h1>Hello world</h1>");
// });

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });

const uri = process.env.MONGODB_URI;

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
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "..", "build")));

  //Importing all routes to prod

  app.route("/api/v1/users").get(users.listAllUsers).post(users.createNewUser);
  app
    .route("/api/v1/users/:id")
    .get(users.getOneUserById)
    .patch(users.updateUser)
    .delete(users.deleteUser);
  app.route("/user/:id").get(users.getOneUserById);

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

  app.route("/messages").get(messages.getMessages);

  app.route("/files").get(files.listAllFiles).post(files.createNewFile);
  app.route("/files/:id").patch(files.updateFile).delete(files.deleteFile);

  app.route("/create-lesson-and-price").post(stripe.createLessonAndPrice);
  app.route("/stripeLessons").get(stripe.getStripeLesson);
  app.route("/stripePrices").get(stripe.getStripePrice);

  app
    .route("/create-checkout-session/:priceId/:senpaiId")
    .post(stripe.createCheckoutSession);

  app.route("/api/v1/vonage/token/:sessionId").get(vonage.getSessionToken);

  app.route("/api/v1/firebase/:authId").get(users.getOneUserByAuthId);

  app.get("*", (req, res) => {
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

// server.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
