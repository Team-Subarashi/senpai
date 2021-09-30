// create App function
module.exports = function (app) {
  const users = require("./controller");
  const lessons = require("./controllers/LessonController");

  app.route("/users").get(users.listAllUsers).post(users.createNewUser);
  app.route("/users/:id").patch(users.updateUser).delete(users.deleteUser);
  app.route("/lessons").get(lessons.listAllLessons).post(lessons.createNewLesson);
  app.route("/lessons/:id").patch(lessons.updateLesson).delete(lessons.deleteLesson);
};
