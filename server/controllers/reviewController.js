const Review = require("../models/reviewModel");

exports.listAllReviews = (req, res) => {
  Review.find({}, (err, review) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(review);
  });
};

exports.createNewReview = (req, res) => {
  let newReview = new Review(req.body);
  newReview.save((err, review) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(review);
  });
};

exports.deleteReview = async (req, res) => {
  await Review.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(404).send(err);
    }
    res.status(200).json({ message: "Review deleted successfully!" });
  });
};
