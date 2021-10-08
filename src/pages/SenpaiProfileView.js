import React from "react";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import BookNowPopover from "../components/BookNowPopover";
import { Container } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#424242",
  },
  root: {
    marginTop: "0px",
    height: "100vh",
    display: "flex",
    justifyContent: "space-evenly",
    alignContent: "center",
    padding: "1rem",
  },
  avatarHolder : {
    alignItems: "center",
    justifyContent: "center",
    height: "25vh",
  }
}));

export default function SenpaiProfileView({ match, location }) {
  const classes = useStyles();
  const senpai = location.state.senpai;

  return (
    <div>
      <Grid
        container
        spacing={3}
        className={classes.root}
      >
        <Grid
          className={classes.container}
          item
          xs={3}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h2">{senpai.name}</Typography>
          <Grid
            className={classes.avatarHolder}
            container
          >
            <Grid>
              <Avatar
                className="senpai-photo"
                alt="senpai"
                src={senpai.avatar}
                style={{ width: 150, height: 150 }}
              />
            </Grid>
          </Grid>
          <BookNowPopover senpaiId={match.params.id} />
          <Grid container style={{ alignItems: "center", padding: "1rem", textAlign: "left" }}>
            {senpai.twitter || senpai.linkedIn || senpai.facebook || senpai.instagram ?
              <Typography variant="h5">
                Socials:
              </Typography>
              : null }  
            <div>
              <Typography variant="h6">
                {senpai.twitter ? <a ><TwitterIcon /></a> : null}
                {senpai.linkedIn ? <a ><LinkedInIcon /> </a> : null}
                {senpai.facebook ? <a ><FacebookIcon /></a> : null}
                {senpai.instagram ? <a ><InstagramIcon /></a> : null}
              </Typography>
            </div>
            {senpai.email ? 
              <div>
                <Typography variant="h5">
                  Email:
                </Typography>
                <Typography variant="h6">
                  <a href={senpai.email}>{senpai.email}</a>
                </Typography>
              </div> : null}
            {senpai.location ? 
              <div>
                <Typography variant="h5">
                  Location:
                </Typography>
                <Typography variant="h6">
                  {senpai.location}
                </Typography>
              </div> : null}
            {senpai.website ? 
              <div>
                <Typography variant="h5">
                  Personal Website:
                </Typography>
                <Typography variant="h6">
                  <a href={senpai.website}>{senpai.website}</a>
                </Typography>
              </div> : null}
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
              <Typography variant="h5" component="p">
                Bio
              </Typography>
            ) : null}
            {senpai.bio ? (
              <Typography variant="h6" component="p">
                {senpai.bio}
              </Typography>
            ) : null}
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}