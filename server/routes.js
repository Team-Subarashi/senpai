// create App function
module.exports = function (app) {
  const users = require("./controllers/userController");
  const files = require("./controllers/fileController");
  const lessons = require("./controllers/LessonController");
  const repositories = require("./controllers/RepositoryController");
  const stripe = require("./controllers/StripeController");
  // const messages = require("./controllers/MessageController");
  const vonage = require("./controllers/vonageController");
  const reviews = require("./controllers/reviewController");

  app.route("/api/v1/users").get(users.listAllUsers).post(users.createNewUser);
  app
    .route("/api/v1/users/:id")
    .get(users.getOneUserById)
    .patch(users.updateUser)
    .delete(users.deleteUser);
  app.route("/api/v1/user/:id").get(users.getOneUserById);
  // app.route("/api/v1/seed").patch(users.userSeed);

  app.route("/api/v1/users/:id/lessons").get(lessons.getUserLessons);
  app.route("/api/v1/senpai//:id/lessons").get(lessons.getLessonsBySenpaiId);
  app.route("/api/v1/kouhai/:id/lessons").get(lessons.getLessonsByKouhaiId);

  app
    .route("/api/v1/lessons")
    .get(lessons.listAllLessons)
    .post(lessons.createNewLesson);
  app
    .route("/api/v1/lessons/:id")
    .patch(lessons.updateLesson)
    .delete(lessons.deleteLesson);

  app.route("/api/v1/user/:id/repositories").get(repositories.getUserRepositories);

  app
    .route("/api/v1/repositories")
    .get(repositories.getAllRepositories)
    .post(repositories.createNewRepository);
  app
    .route("/api/v1/repositories/:id")
    .get(repositories.getRepositoryById)
    .patch(repositories.updateRepository)
    .delete(repositories.deleteRepository);

  // app.route("/messages").get(messages.getMessages);

  app.route("/api/v1/files").get(files.listAllFiles).post(files.createNewFile);
  app.route("/api/v1/files/:id").patch(files.updateFile).delete(files.deleteFile);

  app.route("/api/v1/create-lesson-and-price").post(stripe.createLessonAndPrice);
  app.route("/api/v1/stripeLessons").get(stripe.getStripeLesson);
  app.route("/api/v1/stripePrices").get(stripe.getStripePrice);
  app.route("/api/v1/archivePrices").patch(stripe.archiveAllPrices);
  app.route("/api/v1/archiveProducts").patch(stripe.archiveAllProducts);

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

  // app.post("/create-checkout-session", async (req, res) => {
  //   const session = await stripe.checkout.sessions.create({
  //     line_items: [
  //       {
  //         // TODO: replace this with the `price` of the product you want to sell
  //         price: "price_1Jg1LrEp77X0l0jdvmgYUpwP",
  //         quantity: 1,
  //       },
  //     ],
  //     payment_method_types: ["card"],
  //     mode: "payment",
  //     success_url: `${YOUR_DOMAIN}?success=true`,
  //     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  //   });
  //   res.redirect(303, session.url);
  // });
};
