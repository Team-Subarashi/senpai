import React from "react";
import { Avatar, Grid, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
// if want to have kohai name added the review then we have to make a call by kohaiId to get the name
const Review = ({ review, userList }) => {
  const [user, setUser] = React.useState(userList.find((user) => user._id === review.kouhaiId));

  React.useEffect(() => {
    setUser(userList.find((user) => {
      return user._id === review.kohaiId;
    }));
  }), [userList];

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
        container
        item
        xs={3}
        style={{
          justifyContent: "center", alignItems: "center", flexDirection: "column"
        }}
      >
        <Avatar
          alt="img"
          src={review.avatar}
          style={{ width: 100, height: 100 }}
        />
        {user ? <Typography variant="h5" style={{lineHeight: 2}}>{user.name}</Typography> : null}
      </Grid>
      <Grid item xs={3} style={{textAlign: "left"}}>
        {<Rating value={review.rating} name="rating" size="large" readOnly="true" />}

      </Grid>
      <Grid item xs={6} style={{textAlign: "left"}}>
        <Typography variant="p">{review.review ? review.review : "No description provided"}</Typography>
      </Grid>

    </Grid>
  );
};

export default Review;
