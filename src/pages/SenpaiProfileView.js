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
  test1: {
    backgroundColor: blueGrey[50],
  },
  test2: {
    backgroundColor: blueGrey[100],
  },
}));

export default function SenpaiProfileView({ match, location }) {
  const classes = useStyles();
  const selectedSenpai = useRecoilValue(selectedSenpaiState);

  return (
    <div>
      <Grid container spacing={3} style={{ marginTop: "0px" }}>
        <Grid item xs={8} className={classes.test1}>
          <Container
            fixed
            style={{ backgroundColor: "#cfe8fc", height: "45vh" }}
          >
            <div>Video Here</div>
          </Container>
          <Container fixed style={{ height: "45vh" }}>
            <Grid
              className="left"
              item
              xs={12}
              style={{
                height: "100%",
              }}
            >
              <Typography style={{ fontSize: "25px" }}>Senpai</Typography>
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
                    src="https://www.bobross.com/content/bob_ross_img.png"
                    sx={{ width: 150, height: 150 }}
                  />
                </Grid>
              </Grid>
              <Grid class="detail" style={{ marginLeft: "10px" }}>
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: "20px",
                  }}
                >
                  Location: Bangkok
                </Typography>
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: "20px",
                  }}
                >
                  Email: sample@gmail.com
                </Typography>
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: "20px",
                  }}
                >
                  Bio: Love teaching
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid item xs={4} className={classes.test2}>
          <Container fixed style={{ height: "25vh" }}>
            <div>Schedule Here</div>
          </Container>
          <BookNowPopover senpaiId={match.params.id} />
        </Grid>
      </Grid>
    </div>
  );
}
