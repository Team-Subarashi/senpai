import React from "react";
import Grid from "@material-ui/core/Grid";
import CreateReview from "../components/Reviews/CreateReview";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { userState } from "../atoms";
import { useRecoilValue } from "recoil";
const PreviousLesson = ({ lesson }) => {
  const loginUser = useRecoilValue(userState);
  const date = new Date(lesson.endDate);
  if (loginUser._id === lesson.senpaiId) {
    return (
      <Grid
        container
        border={1}
        xs={12}
        style={{
          borderTop: "0.1px groove",
          height: "15vh",
          alignItems: "center",
        }}
      >
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
        <Grid item xs={3}>
          <div style={{ color: "#9ece6a" }}>Kohai</div>
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
  } else {
    return (
      <Grid
        container
        border={1}
        xs={12}
        style={{
          borderTop: "0.1px groove",
          height: "15vh",
          alignItems: "center",
        }}
      >
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
        <Grid item xs={3}>
          <div style={{ color: "#9ece6a" }}>Senpai</div>
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
  }
};

export default PreviousLesson;
