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
const repositories = require("./controllers/RepositoryController");
const stripe = require("./controllers/StripeController");
const messages = require("./controllers/MessageController");
const vonage = require("./controllers/vonageController");
const reviews = require("./controllers/reviewController");

require("dotenv").config();

let port;
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT;
} else {
  port = 8083;
}

let socket_port = process.env.SOCKET_PORT;

const server = http.createServer(app);

// app.get("/", (req, res) => {
//   res.send("<h1>Hello world</h1>");
// });

//Look at for GCP
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

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
  app.route("/api/v1/user/:id").get(users.getOneUserById);

  app.route("/api/v1/users/:id/lessons").get(lessons.getUserLessons);
  app.route("/api/v1/senpai/:id/lessons").get(lessons.getLessonsBySenpaiId);
  app.route("/api/v1/kouhai/:id/lessons").get(lessons.getLessonsByKouhaiId);

  app
    .route("/api/v1/lessons")
    .get(lessons.listAllLessons)
    .post(lessons.createNewLesson);
  app
    .route("/api/v1/lessons/:id")
    .patch(lessons.updateLesson)
    .delete(lessons.deleteLesson);

  app
    .route("/api/v1/user/:id/repositories")
    .get(repositories.getUserRepositories);

  app
    .route("/api/v1/repositories")
    .get(repositories.getAllRepositories)
    .post(repositories.createNewRepository);
  app
    .route("/api/v1/repositories/:id")
    .get(repositories.getRepositoryById)
    .patch(repositories.updateRepository)
    .delete(repositories.deleteRepository);

  app.route("/messages").get(messages.getMessages);

  app.route("/api/v1/files").get(files.listAllFiles).post(files.createNewFile);
  app.route("/api/v1/files/:id").patch(files.updateFile).delete(files.deleteFile);

  app.route("/api/v1/create-lesson-and-price").post(stripe.createLessonAndPrice);
  app.route("/api/v1/stripeLessons").get(stripe.getStripeLesson);
  app.route("/api/v1/stripePrices").get(stripe.getStripePrice);

  app
    .route("/api/v1/create-checkout-session/:priceId/:senpaiId")
    .post(stripe.createCheckoutSession);

  app.route("/api/v1/vonage/token/:sessionId").get(vonage.getSessionToken);

  app.route("/api/v1/firebase/:authId").get(users.getOneUserByAuthId);

  app
    .route("/api/v1/reviews")
    .get(reviews.listAllReviews)
    .post(reviews.createNewReview);

  app.route("/api/v1/reviews/:id").delete(reviews.deleteReview);

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

server.listen(socket_port, () => {
  console.log(`Server running at http://localhost:${socket_port}`);
});
