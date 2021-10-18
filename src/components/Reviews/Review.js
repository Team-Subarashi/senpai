import React from "react";
import { Avatar, Grid } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
const Review = ({ review }) => {
  console.log(review);
  return (
    <Grid
      container
      border={1}
      xs={12}
      style={{
        borderTop: "0.1px groove",
        margin: "top",
        height: "20vh",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={2}
        style={{
          marginLeft: "10px",
          marginRight: "20px",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <Avatar
          className="lesson-partner-photo"
          alt="img"
          src={review.avatar}
          sx={{ width: 100, height: 100 }}
        />
      </Grid>
      <Grid item xs={3}>
        {<Rating value={review.rating} name="rating" readOnly="true" />}
      </Grid>

      <Grid
        item
        xs={12}
        style={{
          height: "50%",
          marginLeft: "10px",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <p>{review.review}</p>
      </Grid>
    </Grid>
  );
};

export default Review;
