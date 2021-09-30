// create App function
module.exports = function (app) {
  const users = require("./controller");

  app.route("/users").get(users.listAllUsers).post(users.createNewUser);
  app.route("/users/:id").patch(users.updateUser).delete(users.deleteUser);
};
