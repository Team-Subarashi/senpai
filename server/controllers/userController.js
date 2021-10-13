const User = require("../models/userModel");

exports.listAllUsers = (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
};

exports.getOneUserById = (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
};
exports.getOneUserByAuthId = (req, res) => {
  User.findOne({ authId: req.params.authId }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
};

exports.createNewUser = (req, res) => {
  let newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) {
      console.log;
      res.status(500).send(err);
    }
    res.status(201).json(user);
  });
};
// updateTodo function — To update todo status by id
exports.updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, todo) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(todo);
    }
  );
};

// exports.userSeed = async (req, res) => {
//   await User.find({}, (err, user) => {
//     if (err) {
//       res.status(500).send(err);
//     }
//     for (const data of res.json(user)) {
//       res.send(data);
//       // User.deleteOne({ _id: data._id });
//     }
//   });
// };

exports.deleteUser = async (req, res) => {
  await User.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(404).send(err);
    }
    res.status(200).json({ message: "User deleted successfully!" });
  });
};
