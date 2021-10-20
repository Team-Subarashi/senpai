import React, { useState, useEffect } from "react";
import Review from "./Review";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userListState } from "../../atoms";

const ReviewList = ({ senpai }) => {
  const userList = useRecoilValue(userListState);
  const [allReviews, setAllReviews] = useState([]);
  useEffect(() => {
    let mounted = true;

    const fetchReviews = async () => {
      const responseReview = await axios.get("/api/v1/reviews");
      const temp = responseReview.data;
      if (mounted) {
        setAllReviews(temp);
      }
      return () => (mounted = false);
    };
    fetchReviews();
  }, []);

  return (
    <div>
      {allReviews.map((review) => {
        if (review.senpaiId == senpai._id) {
          return (
            <>
              <Review userList={userList} review={review} />
            </>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default ReviewList;
