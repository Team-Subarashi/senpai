import React from "react";
// import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import CreateReview from "../components/Reviews/CreateReview";
import {
  // FormControl,
  // Select,
  // MenuItem,
  Avatar,
  // Typography,
  // InputLabel,
} from "@material-ui/core";
import { Link } from "react-router-dom";
// import { lessonState } from "../atoms";
// import { useRecoilValue, useSetRecoilState } from "recoil";
import { lessonState, userState, selectedDate } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
const PreviousLesson = ({ lesson }) => {
  const loginUser = useRecoilValue(userState);
  const date = new Date(lesson.endDate);
  const AvatarLink = () => {
    if (loginUser._id === lesson.senpaiId) {
      console.log("///////////////////////////////////////");
      console.log("im logged in as ", loginUser._id);
      console.log("had lesson as senpai");
      console.log("i need to see kohai profile", lesson.kouhaiId);
      return (
        <>
          <Grid
            item
            xs={1}
            style={{
              marginLeft: "10px",
              padding: "10px",
              alignItems: "center",
            }}
          >
            <Link to={`/senpai/${lesson.kouhaiId}`}>
              <Avatar
                className="lesson-partner-photo"
                alt="img"
                src={lesson.avatar}
                sx={{ width: 100, height: 100 }}
              />
            </Link>
          </Grid>
        </>
      );
    } else {
      // this time loginUser is not senpai for the lesson
      console.log("///////////////////////////////////////");
      console.log("had lesson as a kohai");
      console.log("senpaiId", lesson.senpaiId);
      return (
        <>
          <Grid
            item
            xs={1}
            style={{
              marginLeft: "10px",
              padding: "10px",
              alignItems: "center",
            }}
          >
            <Link to={`/senpai/${lesson.senpaiId}`}>
              <Avatar
                className="lesson-partner-photo"
                alt="img"
                src={lesson.avatar}
                sx={{ width: 100, height: 100 }}
              />
            </Link>
          </Grid>
        </>
      );
    }
  };

  return (
    <Grid
      container
      border={1}
      xs={12}
      style={{
        borderTop: "0.1px groove",
        height: "10vh",
        alignItems: "center",
      }}
    >
      <AvatarLink />
      <Grid item xs={3}>
        <div style={{ color: "#9ece6a" }}>Partner</div>
        <p>{lesson.name}</p>
      </Grid>
      <Grid item xs={3}>
        <div style={{ color: "#9ece6a" }}>Date</div>
        <p>{date.toDateString()}</p>
      </Grid>
      <Grid item xs={3}>
        <CreateReview key={lesson._id} lesson={lesson} />
      </Grid>
    </Grid>
  );
};

export default PreviousLesson;
