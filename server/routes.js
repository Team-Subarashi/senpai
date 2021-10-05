// create App function
module.exports = function (app) {
  const users = require("./controllers/userController");
  const files = require("./controllers/fileController");
  const lessons = require("./controllers/LessonController");
  const stripe = require("./controllers/StripeController");

  app.route("/api/v1/users").get(users.listAllUsers).post(users.createNewUser);
  app
    .route("/api/v1/users/:id")
    .get(users.getOneUserByAuthId)
    .patch(users.updateUser)
    .delete(users.deleteUser);
  app.route("/api/v1/users/:id/lessons").get(lessons.getLessonsBySenpaiId);
  app.route("/api/v1/senpai/:id/lessons").get(lessons.getLessonsBySenpaiId)
  app.route("/api/v1/kouhai/:id/lessons").get(lessons.getLessonsByKouhaiId)


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
