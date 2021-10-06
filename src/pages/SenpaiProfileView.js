import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { selectedSenpaiState } from "../atoms";
import { useRecoilValue } from "recoil";
import { blueGrey } from "@material-ui/core/colors";
import BookNowPopover from "../components/BookNowPopover";
import { Button, Box, Container } from "@material-ui/core";
import { Avatar, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  left: {
    backgroundColor: blueGrey[50],
  },
  right: {
    backgroundColor: blueGrey[100],
  },
}));

export default function SenpaiProfileView({ match, location }) {
  const classes = useStyles();
  const senpai = location.state.senpai;
  console.log(senpai)

  return (
    <div style={{color: "black"}}>
      <Grid container spacing={3} style={{ marginTop: "0px", height: "100vh", display:"flex", justifyContent:"space-evenly", padding: "1rem" }}>
        <Grid
          className={classes.left}
          item
          xs={3}
          style={{
            height: "100%",
            // borderRight: "#616161 1rem solid",
            // borderLeft: "#616161 1rem solid",
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
            <Typography
              style={{
                textAlign: "left",
                fontSize: "20px",
              }}
            >
              Socials:
            </Typography>
          {senpai.twitter ? <Typography
              style={{
                textAlign: "left",
                fontSize: "20px",
              }}
            >
              <a href={senpai.twitter}>@{senpai.twitter}</a>
            </Typography> : null}
          {senpai.linkedIn ? <Typography
              style={{
                textAlign: "left",
                fontSize: "20px",
              }}
            >
              <a href={senpai.twitter}>LinkedIn</a>
            </Typography> : null}
          {senpai.facebook ? <Typography
              style={{
                textAlign: "left",
                fontSize: "20px",
              }}
            >
              <a href={senpai.facebook}>Facebook</a>
            </Typography> : null}
          
          
            
          </Grid>
        </Grid>
        <Grid container xs={8} style={{display: "flex", flexDirection:"column", justifyContent:"space-between"}} >
          <Container
            fixed
            style={{ backgroundColor: "#cfe8fc", padding: "1rem", height: "65vh" }}
          >
            <iframe width="854" height="480" src="https://www.youtube.com/embed/dHRO8M6elcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>     
          </Container>
          <Container
            fixed
            className={classes.right}
            style={{ height: "30vh", padding: "2rem" }}
          >
                        {senpai.bio ? <Typography
              style={{
                textAlign: "left",
                fontSize: "20px",
              }}
            >
              Bio: {senpai.bio}
            </Typography> : null}
          </Container>   
        </Grid>
      </Grid>
    </div>
  );
}