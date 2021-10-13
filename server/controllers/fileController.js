const File = require("../models/fileModel");

exports.listAllFiles = (req, res) => {
  File.find({}, (err, file) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(file);
  });
};

exports.createNewFile = (req, res) => {
  console.log(req.body)
  let newFile = new File(req.body);
  newFile.save((err, file) => {
    if (err) {
      console.log
      res.status(500).send(err);
    }
    res.status(201).json(file);
  });
};
// updateTodo function — To update todo status by id
exports.updateFile = (req, res) => {
  File.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, file) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(file);
    }
  );
};

exports.deleteFile = async (req, res) => {
  await File.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(404).send(err);
    }
    res.status(200).json({ message: "File deleted successfully!" });
  });
};
