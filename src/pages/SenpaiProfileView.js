import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { repositoriesState } from "../atoms";
import ReviewList from "../components/Reviews/ReviewList";
import { Rating } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: "#424242",
    margin: "1rem",
  },
  aboutMe: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#424242",
    margin: "1rem",
    minWidth: "260px",
    maxWidth: "260px",
  },
  root: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    padding: "1rem",
  },
  avatarHolder: {
    alignItems: "center",
    justifyContent: "center",
    height: "25vh",
  },
  contactDetails: {
    alignItems: "center",
    padding: "1rem",
    textAlign: "left",
  },
  aboutMeItem: {
    padding: "1rem",
  },
  videoIframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  videoDiv: {
    position: "relative",
    width: "100%",
    height: 0,
    paddingBottom: "56.25%",
  },
  right: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    marginBottom: "2rem",
  },
}));

export default function SenpaiProfileView({ match, location }) {
  const classes = useStyles();
  const [senpai, setSenpai] = useState(
    location.state ? location.state.senpai : null
  );
  const repositories = useRecoilValue(repositoriesState);
  const [userRepositories, setUserRepositories] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("/api/v1/users/" + match.params.id);
    if (response.data) {
      setSenpai(response.data);
    }
    setUserRepositories(
      repositories.filter((repository) => repository.userId === match.params.id)
    );
  };

  useEffect(() => {
    if (match.params.id) {
      fetchData();
    }
  }, []);

  //Review
  const [averageScore, setAverageScore] = useState(0);
  useEffect(() => {
    let mounted = true;

    const fetchReviews = async () => {
      const responseReview = await axios.get("/api/v1/reviews");
      const reviews = responseReview.data;
      const senpaiReviews = reviews.filter(
        (review) => review.senpaiId === match.params.id
      );

      if (senpaiReviews.length === 0) {
        senpaiReviews.push(0);
        setAverageScore(
          senpaiReviews.map((review) => review.rating).reduce((prevVal, currentVal) => {
            return prevVal + currentVal;
          }) / senpaiReviews.length
        );
      } else if (mounted && senpaiReviews.length !== 0) {
        setAverageScore(
          senpaiReviews.map((review) => review.rating).reduce((prevVal, currentVal) => {
            return prevVal + currentVal;
          }) / senpaiReviews.length
        );
      }
      return () => (mounted = false);
    };
    fetchReviews();
  }, []);

  return (
    <Container style={{ height: "92vh" }}>
      <Box style={{ height: "100%" }}>
        {senpai ? (
          <Grid container spacing={3} className={classes.root}>
            <Grid className={classes.aboutMe} container item xs={3}>
              <Grid item className={classes.aboutMeItem}>
                <Typography variant="h2">{senpai.name}</Typography>
              </Grid>

              <Grid item className={classes.aboutMeItem}>
                <Avatar
                  className="senpai-photo"
                  alt="senpai"
                  src={senpai.avatar}
                  style={{ width: 150, height: 150 }}
                />
              </Grid>

              <Grid item className={classes.aboutMeItem}>
                <Button variant="contained" color="secondary">
                  <Link
                    style={{ color: "white" }}
                    to={`/senpai/${match.params.id}/schedule`}
                  >
                    View schedule
                  </Link>
                </Button>
              </Grid>
              <Grid item className={classes.aboutMeItem}>
                <Rating
                  value={averageScore}
                  name="rating"
                  readOnly="true"
                  precision={0.5}
                />
              </Grid>

              <Grid container item className={classes.contactDetails}>
                <div style={{ width: "100%", marginBottom: "1rem" }}>
                  <Typography variant="h5">Skills:</Typography>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-evenly",
                    }}
                  >
                    {senpai.category
                      ? senpai.category.map((category) => (
                        <Button
                          key={category}
                          variant="contained"
                          color="primary"
                          style={{ padding: "0" }}
                        >
                          {category}
                        </Button>
                      ))
                      : null}
                  </div>
                </div>
                {senpai.twitter ||
                senpai.linkedIn ||
                senpai.facebook ||
                senpai.instagram ||
                senpai.github ? (
                    <Typography variant="h5">Socials:</Typography>
                  ) : null}
                <div>
                  <Typography variant="h6">
                    {senpai.twitter ? (
                      <a
                        target="_blank"
                        href={`${senpai.twitter}`}
                        rel="noreferrer"
                      >
                        <IconButton>
                          <TwitterIcon />
                        </IconButton>
                      </a>
                    ) : null}
                    {senpai.linkedIn ? (
                      <a
                        target="_blank"
                        href={`${senpai.linkedIn}`}
                        rel="noreferrer"
                      >
                        <IconButton>
                          <LinkedInIcon />
                        </IconButton>
                      </a>
                    ) : null}
                    {senpai.facebook ? (
                      <a
                        target="_blank"
                        href={`${senpai.facebook}`}
                        rel="noreferrer"
                      >
                        <IconButton>
                          <FacebookIcon />
                        </IconButton>
                      </a>
                    ) : null}
                    {senpai.instagram ? (
                      <a
                        target="_blank"
                        href={`${senpai.instagram}`}
                        rel="noreferrer"
                      >
                        <IconButton>
                          <InstagramIcon />
                        </IconButton>
                      </a>
                    ) : null}
                    {senpai.github ? (
                      <a
                        target="_blank"
                        href={`${senpai.github}`}
                        rel="noreferrer"
                      >
                        <IconButton>
                          <GitHubIcon />
                        </IconButton>
                      </a>
                    ) : null}
                  </Typography>
                </div>
                {senpai.email ? (
                  <div>
                    <Typography variant="h5">Email:</Typography>
                    <Typography variant="h6">
                      <a href={senpai.email} style={{ color: "#2ac3de" }}>
                        {senpai.email}
                      </a>
                    </Typography>
                  </div>
                ) : null}
                {senpai.location ? (
                  <div>
                    <Typography variant="h5">Location:</Typography>
                    <Typography variant="h6">{senpai.location}</Typography>
                  </div>
                ) : null}
                {senpai.website ? (
                  <div>
                    <Typography xs={3} variant="h5">
                      Personal Website:
                    </Typography>
                    <Typography variant="h6">
                      <a href={senpai.website} style={{ color: "#2ac3de" }}>
                        {senpai.website}
                      </a>
                    </Typography>
                  </div>
                ) : null}
              </Grid>
            </Grid>
            <Grid item xs={8} className={classes.right}>
              {senpai.introVideo ? (
                <Container
                  fixed
                  className={classes.container}
                  style={{ padding: "1rem" }}
                >
                  <div className={classes.videoDiv}>
                    <iframe
                      src={`https://www.youtube.com/embed/${
                        senpai.introVideo.split("?v=")[1]
                      }`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className={classes.videoIframe}
                    ></iframe>
                  </div>
                </Container>
              ) : null}
              {senpai.bio ? (
                <Container
                  fixed
                  className={classes.container}
                  style={{ padding: "2rem" }}
                >
                  <Typography variant="h3">About me</Typography>
                  <Typography variant="h6" component="p">
                    {senpai.bio}
                  </Typography>
                </Container>
              ) : null}
              {userRepositories.length > 0 ? (
                <Container
                  fixed
                  className={classes.container}
                  style={{ padding: "2rem" }}
                >
                  {userRepositories.length > 0 ? (
                    <Typography variant="h3">Repositories</Typography>
                  ) : null}

                  <Typography variant="h6" component="p">
                    {userRepositories.map((repository) => (
                      <div style={{ padding: "1rem" }} key={repository.url}>
                        <Typography
                          variant="h4"
                          component="span"
                          style={{ color: "#9ece6a" }}
                        >
                          {repository.title}
                        </Typography>
                        <Typography variant="h4" component="span">
                          {" "}
                          -{" "}
                        </Typography>
                        <Typography
                          variant="h6"
                          component="span"
                          style={{ fontStyle: "italic" }}
                        >
                          {repository.description}
                        </Typography>
                        <Typography variant="h6">
                          <a style={{ color: "#2ac3de" }} href={repository.url}>
                            {repository.url}
                          </a>
                        </Typography>
                      </div>
                    ))}
                  </Typography>
                </Container>
              ) : null}
              <Container
                fixed
                className={classes.container}
                style={{ padding: "2rem" }}
              >
                <Typography variant="h3">Reviews</Typography>
                <ReviewList senpai={senpai} />
              </Container>
            </Grid>
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Container>
  );
}
