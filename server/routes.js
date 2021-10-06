// create App function
module.exports = function (app) {
  const users = require("./controllers/userController");
  const files = require("./controllers/fileController");
  const lessons = require("./controllers/LessonController");
  const stripe = require("./controllers/StripeController");
  const messages = require("./controllers/MessageController")

  app.route("/users").get(users.listAllUsers).post(users.createNewUser);
  app.route("/users/:id").get(users.getOneUserByAuthId).patch(users.updateUser).delete(users.deleteUser);
  app.route("/users/:id/lessons").get(lessons.getUserLessons);

  app.route("/senpai/:id/lessons").get(lessons.getLessonsBySenpaiId)
  app.route("/kouhai/:id/lessons").get(lessons.getLessonsByKouhaiId)


  app.route("/lessons").get(lessons.listAllLessons).post(lessons.createNewLesson);
  app.route("/lessons/:id").patch(lessons.updateLesson).delete(lessons.deleteLesson);

  app.route("/files").get(files.listAllFiles).post(files.createNewFile);
  app.route("/files/:id").patch(files.updateFile).delete(files.deleteFile);

  app.route("/create-checkout-session/:priceId/:senpaiId").post(stripe.createCheckoutSession);
  app.route("/create-lesson-and-price").post(stripe.createLessonAndPrice);
  app.route("/stripeLessons").get(stripe.getStripeLesson);

  app.route("/messages").get(messages.getMessages);

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
