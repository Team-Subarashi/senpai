import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import { Link } from "react-router-dom";
import axios from "axios";
import ReviewList from "../components/Reviews/ReviewList";

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
    marginTop: "1rem",
    height: "100vh",
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
  },
}));

export default function SenpaiProfileView({ match, location }) {
  const classes = useStyles();

  const [senpai, setSenpai] = useState(
    location.state ? location.state.senpai : null
  );
  const fetchData = async () => {
    const response = await axios.get("/api/v1/users/" + match.params.id);
    if (response.data) {
      setSenpai(response.data);
    }
  };

  useEffect(() => {
    console.log(senpai);
  }, [senpai]);

  useEffect(() => {
    if (match.params.id) {
      fetchData();
    }
  }, []);

  return (
    <Container>
      <Box>
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
                <Button variant="contained" color="primary">
                  <Link
                    style={{ color: "white" }}
                    to={`/senpai/${match.params.id}/schedule`}
                  >
                    View schedule
                  </Link>
                </Button>
              </Grid>

              <Grid container item className={classes.contactDetails}>
                {senpai.twitter ||
                senpai.linkedIn ||
                senpai.facebook ||
                senpai.instagram ? (
                  <Typography variant="h5">Socials:</Typography>
                ) : null}
                <div>
                  <Typography variant="h6">
                    {senpai.twitter ? (
                      <a>
                        <TwitterIcon />
                      </a>
                    ) : null}
                    {senpai.linkedIn ? (
                      <a>
                        <LinkedInIcon />{" "}
                      </a>
                    ) : null}
                    {senpai.facebook ? (
                      <a>
                        <FacebookIcon />
                      </a>
                    ) : null}
                    {senpai.instagram ? (
                      <a>
                        <InstagramIcon />
                      </a>
                    ) : null}
                  </Typography>
                </div>
                {senpai.email ? (
                  <div>
                    <Typography variant="h5">Email:</Typography>
                    <Typography variant="h6">
                      <a href={senpai.email}>{senpai.email}</a>
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
                      <a href={senpai.website}>{senpai.website}</a>
                    </Typography>
                  </div>
                ) : null}
              </Grid>
            </Grid>
            <Grid container xs={8} className={classes.right}>
              <Container
                fixed
                className={classes.container}
                style={{ padding: "1rem" }}
              >
                {senpai.introVideo ? (
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
                ) : (
                  <p>No Video Found</p>
                )}
              </Container>
              <Container
                fixed
                className={classes.container}
                style={{ padding: "2rem" }}
              >
                {senpai.bio ? (
                  <Typography variant="h3">About me</Typography>
                ) : null}
                {senpai.bio ? (
                  <Typography variant="h6" component="p">
                    {senpai.bio}
                  </Typography>
                ) : null}
              </Container>
              <Grid xs={4} style={{ height: "50vh", overflow: "auto" }}>
                <ReviewList senpai={senpai} />
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Container>
  );
}
