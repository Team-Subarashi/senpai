// create App function
module.exports = function (app) {
  const users = require("./controllers/userController");
  const files = require("./controllers/fileController");
  const lessons = require("./controllers/LessonController");

  app.route("/users").get(users.listAllUsers).post(users.createNewUser);
  app.route("/users/:id").get(users.getOneUserByAuthId).patch(users.updateUser).delete(users.deleteUser);

  app.route("/lessons").get(lessons.listAllLessons).post(lessons.createNewLesson);
  app.route("/lessons/:id").get(lessons.getLessonsBySenpaiId).patch(lessons.updateLesson).delete(lessons.deleteLesson);

  app.route("/files").get(files.listAllFiles).post(files.createNewFile);
  app.route("/files/:id").patch(files.updateFile).delete(files.deleteFile);

};
