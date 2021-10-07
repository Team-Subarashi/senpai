import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import BookNowPopover from "../components/BookNowPopover";
import { Container } from "@material-ui/core";
import { Avatar, Typography } from "@mui/material";
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#303030",
  },
}));

export default function SenpaiProfileView({ match, location }) {
  const classes = useStyles();
  const senpai = location.state.senpai;

  return (
    <div style={{ color: "white" }}>
      <Grid
        container
        spacing={3}
        style={{
          backgroundColor: "#616161",
          marginTop: "0px",
          height: "100vh",
          display: "flex",
          justifyContent: "space-evenly",
          padding: "1rem",
        }}
      >
        <Grid
          className={classes.container}
          item
          xs={3}
          style={{
            height: "100%",
          }}
        >
          <Typography style={{ fontSize: "25px" }}>{senpai.name}</Typography>
          <Grid
            className="avatar-holder"
            container
            alignItems="center"
            justify="center"
            style={{
              height: "25vh",
            }}
          >
            <Grid>
              <Avatar
                className="senpai-photo"
                alt="senpai"
                src={senpai.avatar}
                sx={{ width: 150, height: 150 }}
              />
            </Grid>
          </Grid>
          <BookNowPopover senpaiId={match.params.id} />
          <Grid style={{ margin: "10px", padding: "2rem" }}>
          <Typography
              style={{
                textAlign: "left",
                fontSize: "20px",
              }}
            >
              Socials:
            </Typography>
            <Typography
              style={{
                textAlign: "left",
                fontSize: "20px",
              }}
            >
              {senpai.twitter ? <a ><TwitterIcon /></a> : null}
              {senpai.linkedIn ? <a ><LinkedInIcon /> </a> : null}
              {senpai.facebook ? <a ><FacebookIcon /></a> : null}
              {senpai.facebook ? <a ><InstagramIcon /></a> : null}
              {/* {senpai.twitter ? <a href={senpai.twitter}><TwitterIcon /></a> : null}
              {senpai.linkedIn ? <a href={senpai.linkedIn}><LinkedInIcon /> </a> : null}
              {senpai.facebook ? <a href={senpai.facebook}><FacebookIcon /></a> : null}
              {senpai.facebook ? <a href={senpai.instagram}><InstagramIcon /></a> : null} */}
            </Typography>
            {senpai.email ? <Typography
              style={{
                textAlign: "left",
                fontSize: "20px",
              }}
            >
              <div>Email:</div>
               <a href={senpai.email}>{senpai.email}</a>
            </Typography> : null}
            {senpai.location ? <Typography
              style={{
                textAlign: "left",
                fontSize: "20px",
              }}
            >
              Location: {senpai.location}
            </Typography> : null}
            {senpai.website ? <Typography
              style={{
                textAlign: "left",
                fontSize: "20px",
              }}
            >
              <div>Personal Website:</div>
              <a href={senpai.website}>{senpai.website}</a>
            </Typography> : null}
          </Grid>
        </Grid>
        <Grid
          container
          xs={8}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Container
            fixed
            className={classes.container}
            style={{
              padding: "1rem",
              height: "65vh",
            }}
          >
            <iframe
              width="854"
              height="480"
              src="https://www.youtube.com/embed/dHRO8M6elcQ"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </Container>
          <Container
            fixed
            className={classes.container}
            style={{ height: "30vh", padding: "2rem" }}
          >
            {senpai.bio ? (
              <Typography
                style={{
                  textAlign: "left",
                  fontSize: "20px",
                }}
              >
                Bio: {senpai.bio}
              </Typography>
            ) : null}
          </Container>
        </Grid>

        {/* <Grid item xs={4} className={classes.test2}>
          <Container fixed style={{ height: "25vh" }}>
            <div>Schedule Here</div>
          </Container>
          <BookNowPopover senpaiId={match.params.id} />
        </Grid> */}
      </Grid>
    </div>
  );
}