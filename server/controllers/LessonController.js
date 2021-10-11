const Lesson = require("../models/LessonModel");
require("dotenv").config();

let OpenTok = require('opentok');
let opentok = new OpenTok(process.env.API_KEY, process.env.SECRET);

exports.listAllLessons = (req, res) => {
  Lesson.find({}, (err, lesson) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(lesson);
  });
};

exports.getUserLessons = (req, res) => {
  Lesson.find({ $or: [{ senpaiId: req.params.id }, { kouhaiId: req.params.id }]}, (err, lesson) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(lesson);
  });
};

exports.getLessonsBySenpaiId = (req, res) => {
  Lesson.find({ senpaiId: req.params.id }, (err, lesson) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(lesson);
  });
};

exports.getLessonsByKouhaiId = (req, res) => {
  Lesson.find({ kouhaiId: req.params.id }, (err, lesson) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(lesson);
  });
};

exports.createNewLesson = async (req, res) => {
  await opentok.createSession(function(err, session) {
    if (err) return console.log(err);
    req.body.vonageSessionId = session.sessionId
    let newLesson = new Lesson(req.body);
    newLesson.save((err, lesson) => {
      if (err) {
        console.log
        res.status(500).send(err);
      }
      res.status(201).json(lesson);
    });
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
