// create App function
module.exports = function (app) {
  const users = require("./controllers/userController");
  const files = require("./controllers/fileController");

  app.route("/users").get(users.listAllUsers).post(users.createNewUser);
  app.route("/users/:id").patch(users.updateUser).delete(users.deleteUser);

  app.route("/files").get(files.listAllFiles).post(files.createNewFile);
  app.route("/files/:id").patch(files.updateFile).delete(files.deleteFile);



};
