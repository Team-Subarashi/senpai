const Repository = require("../models/repositoryModel");
/*

_id
userId
title
url
description

*/

exports.getAllRepositories = (req, res) => {
  Repository.find({}, (err, repository) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(repository);
  });
};

exports.getRepositoryById = (req, res) => {
  Repository.findOne({ _id: req.params.id }, (err, repository) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(repository);
  });
};

exports.getUserRepositories = (req, res) => {
  Repository.find({ userId: req.params.id }, (err, repository) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(repository);
  });
};

exports.createNewRepository = (req, res) => {
  let newRepository = new Repository(req.body);
  newRepository.save((err, repository) => {
    if (err) {
      console.log;
      res.status(500).send(err);
    }
    res.status(201).json(repository);
  });
};

exports.updateRepository = (req, res) => {
  Repository.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, updatedRepository) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(updatedRepository);
    }
  );
};

exports.deleteRepository = async (req, res) => {
  await Repository.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(404).send(err);
    }
    res.status(200).json({ message: "Repository deleted successfully!" });
  });
};
