import React from "react";
// import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {
  Grid,
  // Box, Button
} from "@material-ui/core";
// import Typography from "@material-ui/core/Typography";

export default function Info() {
  return (
    <Box style={{ height: "86.7vh" }}>
      <Grid
        container
        //   alignItems="center"
        justifyContent="space-between"
      >
        {/* About Us */}
        <Grid
          item
          xs={12}
          style={{
            height: "33vh",
            marginTop: "1vh",
            marginBottom: "1vh",
            borderRadius: "4px",
            backgroundColor: "#424242",
          }}
        >
          <Grid
            item
            style={{
              textAlign: "start",
              paddingLeft: "5vw",
              paddingTop: "0.3vh",
              fontSize: "30px",
              fontFamily: "Nunito",
              height: "5vh",
              background: "linear-gradient(to right, #6737b8, #424242)",
              // backgroundColor: "#673AB7",
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "4px",
            }}
          >
            About Senpai
          </Grid>
          <Grid item style={{ paddingTop: "5vh", fontSize: "20px" }}>
            Senpai was created as a way to bring together programmers of all
            levels, and to not only help budding programmers learn from their
            peers, but to help veterans spread their knowledge and experience,
            all on one platform.
          </Grid>
        </Grid>

        {/* Picture Section */}
        <Grid
          item
          id="greg"
          xs={6}
          style={{
            height: "33vh",
            marginTop: "1vh",
            marginBottom: "1vh",
            backgroundColor: "pink",
          }}
        >
          <img
            src="https://scontent-nrt1-1.xx.fbcdn.net/v/t1.6435-9/72750529_2927365680624885_9078900207579561984_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=u9qvgKq2AmkAX_j31Kp&_nc_ht=scontent-nrt1-1.xx&oh=684fd3e88d8fdedfae65baefc63642d3&oe=618EA439"
            style={{ height: "100%" }}
          />
        </Grid>
        {/* Picture Section */}
        <Grid
          item
          id="greg"
          xs={6}
          style={{
            height: "33vh",
            marginTop: "1vh",
            marginBottom: "1vh",
            backgroundColor: "pink",
          }}
        >
          <img
            src="https://scontent-nrt1-1.xx.fbcdn.net/v/t1.6435-9/72750529_2927365680624885_9078900207579561984_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=u9qvgKq2AmkAX_j31Kp&_nc_ht=scontent-nrt1-1.xx&oh=684fd3e88d8fdedfae65baefc63642d3&oe=618EA439"
            style={{ height: "100%" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
