const Lesson = require("../models/LessonModel");
const User = require("../models/userModel");
require("dotenv").config();

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { // THIS SHOULD BE IN .ENV
    user: 'subarashisenpaiapp@gmail.com',
    pass: 'subarashi-team'
  }
});

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
  Lesson.find(
    { $or: [{ senpaiId: req.params.id }, { kouhaiId: req.params.id }] },
    (err, lesson) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(lesson);
    }
  );
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
  await opentok.createSession(function (err, session) {
    if (err) return console.log(err);
    req.body.vonageSessionId = session.sessionId;
    let newLesson = new Lesson(req.body);
    newLesson.save((err, lesson) => {
      if (err) {
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
    async (err, lesson) => {
      if (err) {
        res.status(500).send(err);
      }

      const senpai = await User.findById(lesson.senpaiId);
      const kouhai = await User.findById(req.body.kouhaiId);

      let toSenpai = {
        from: 'subarashisenpaiapp@gmail.com',
        to: senpai.email,
        subject: `New Lesson with ${kouhai.name}`,
        text: `Time: ${new Date(lesson.startDate)}`
      };

      transporter.sendMail(toSenpai, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          console.log(toSenpai.to);

        }
      });

      let toKouhai = {
        from: 'subarashisenpaiapp@gmail.com',
        to: kouhai.email,
        subject: `Lesson booked with ${senpai.name}`,
        text: `Time: ${new Date(lesson.startDate)}`
      };

      transporter.sendMail(toKouhai, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          console.log(toKouhai.to);
        }
      });


      res.status(200).json(lesson);
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
