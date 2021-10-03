const User = require("../models/userModel");

exports.listAllUsers = (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
};

exports.getOneUserByAuthId = (req, res) => {
  User.findOne({ authId: req.params.id }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  })
}

exports.createNewUser = (req, res) => {
  console.log(req.body)
  let newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) {
      console.log
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

exports.deleteUser = async (req, res) => {
  await User.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(404).send(err);
    }
    res.status(200).json({ message: "User deleted successfully!" });
  });
};
