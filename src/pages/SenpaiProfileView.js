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
    if (match.params.id) {
      fetchData();
    }
  }, []);

  return (
    <>
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
                        <a
                          target="_blank"
                          href={`${senpai.twitter}`}
                          rel="noreferrer"
                        >
                          <Button>
                            <TwitterIcon />
                          </Button>
                        </a>
                      ) : null}
                      {senpai.linkedIn ? (
                        <a
                          target="_blank"
                          href={`${senpai.linkedIn}`}
                          rel="noreferrer"
                        >
                          <Button>
                            <LinkedInIcon />
                          </Button>
                        </a>
                      ) : null}
                      {senpai.facebook ? (
                        <a
                          target="_blank"
                          href={`${senpai.facebook}`}
                          rel="noreferrer"
                        >
                          <Button>
                            <FacebookIcon />
                          </Button>
                        </a>
                      ) : null}
                      {senpai.instagram ? (
                        <a
                          target="_blank"
                          href={`${senpai.instagram}`}
                          rel="noreferrer"
                        >
                          <Button>
                            <InstagramIcon />
                          </Button>
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
                      <Typography variant="h5">Personal Website:</Typography>
                      <Typography variant="h6">
                        <a
                          target="_blank"
                          href={`${senpai.website}`}
                          rel="noreferrer"
                        >
                          <a>{senpai.website}</a>
                        </a>
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
                  <div className={classes.videoDiv}>
                    {senpai.introVideo ? (
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
                    ) : null}
                  </div>
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
              </Grid>
            </Grid>
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Container>
    </>
  );
}
