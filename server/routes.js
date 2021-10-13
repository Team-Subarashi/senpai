// create App function
module.exports = function (app) {
  const users = require("./controllers/userController");
  const files = require("./controllers/fileController");
  const lessons = require("./controllers/LessonController");
  const stripe = require("./controllers/StripeController");
  const messages = require("./controllers/MessageController");
  const vonage = require("./controllers/vonageController");
  const reviews = require("./controllers/reviewController");

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

  app.route("/files").get(files.listAllFiles).post(files.createNewFile);
  app.route("/files/:id").patch(files.updateFile).delete(files.deleteFile);

  app.route("/create-lesson-and-price").post(stripe.createLessonAndPrice);
  app.route("/stripeLessons").get(stripe.getStripeLesson);

  app.route("/messages").get(messages.getMessages);

  app
    .route("/create-checkout-session/:priceId/:senpaiId")
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
