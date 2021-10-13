import React from "react";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import CreateReview from "../components/Reviews/CreateReview";
import { Avatar } from "@material-ui/core";

const PreviousLesson = ({ lesson }) => {
  const date = new Date(lesson.endDate);
  return (
    <Grid
      container
      border={1}
      xs={12}
      style={{
        borderTop: "0.1px groove",
        margin: "top",
        height: "10vh",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={1}
        style={{ marginLeft: "10px", padding: "10px", alignItems: "center" }}
      >
        <Avatar
          className="lesson-partner-photo"
          alt="img"
          src={lesson.avatar}
          sx={{ width: 100, height: 100 }}
        />
      </Grid>
      <Grid item xs={3}>
        <div>Name</div>
        <p>{lesson.name}</p>
      </Grid>
      <Grid item xs={3}>
        <div>Date</div>
        <p>{date.toDateString()}</p>
      </Grid>
      <Grid item xs={3}>
        <CreateReview key={lesson._id} lesson={lesson} />
      </Grid>
    </Grid>
  );
};

export default PreviousLesson;
