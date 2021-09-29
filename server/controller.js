// import User Model
const User = require("./model");
// DEFINE CONTROLLER FUNCTIONS
// listAllUsers function — To list all users
exports.listAllUsers = (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
};
// createNewUser function — To create new user
exports.createNewUser = (req, res) => {
  let newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(user);
  });
};
// updateTodo function — To update todo status by id
// exports.updateTodo = (req, res) => {
//   Todo.findOneAndUpdate(
//     { _id: req.params.id },
//     req.body,
//     { new: true },
//     (err, todo) => {
//       if (err) {
//         res.status(500).send(err);
//       }
//       res.status(200).json(todo);
//     }
//   );
// };
// deleteTodo function — To delete todo by id
// exports.deleteTodo = async (req, res) => {
//   await Todo.deleteOne({ _id: req.params.id }, (err) => {
//     if (err) {
//       return res.status(404).send(err);
//     }
//     res.status(200).json({ message: "Todo successfully deleted" });
//   });
// };
