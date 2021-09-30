const Lesson = require("../models/LessonModel");

exports.listAllLessons = (req, res) => {
  Lesson.find({}, (err, lesson) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(lesson);
  });
};

exports.createNewLesson = (req, res) => {
  console.log(req.body)
  let newLesson = new Lesson(req.body);
  newLesson.save((err, lesson) => {
    if (err) {
      console.log
      res.status(500).send(err);
    }
    res.status(201).json(lesson);
  });
};
// updateTodo function — To update todo status by id
exports.updateLesson = (req, res) => {
  Lesson.findOneAndUpdate(
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

exports.deleteLesson = async (req, res) => {
  await Lesson.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(404).send(err);
    }
    res.status(200).json({ message: "Lesson deleted successfully!" });
  });
};
