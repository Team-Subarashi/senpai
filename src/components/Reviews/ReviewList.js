import React, { useState, useEffect } from "react";
import Review from "./Review";
import axios from "axios";

const ReviewList = ({ senpai }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReview = async () => {
      const responseReview = await axios.get("/api/v1/reviews");
      const allReviews = responseReview.data;
      let temp = [];
      allReviews.map((review) => {
        if (review.senpaiId == senpai._id) {
          temp.push(review);
        } else {
          return;
        }
      });
      setReviews(temp);
    };
    fetchReview();
  }, [reviews]);
  return (
    <div>
      {reviews.map((review) => {
        return (
          <>
            <Review review={review} />
          </>
        );
      })}
    </div>
  );
};

export default ReviewList;
