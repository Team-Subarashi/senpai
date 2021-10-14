import React from "react";
import {
  Grid,
  // Box, Button
} from "@material-ui/core";
// import Typography from "@material-ui/core/Typography";

export default function AboutUs() {
  return (
    <Grid
      container
      //   alignItems="center"
      justifyContent="space-between"
    >
      {/* Greg Section */}
      <Grid
        item
        id="greg"
        xs={3}
        style={{
          height: "33vh",
          marginTop: "1vh",
          marginBottom: "1vh",
          marginLeft: "25vw",
          backgroundColor: "pink",
        }}
      >
        <img
          src="https://scontent-nrt1-1.xx.fbcdn.net/v/t1.6435-9/72750529_2927365680624885_9078900207579561984_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=u9qvgKq2AmkAX_j31Kp&_nc_ht=scontent-nrt1-1.xx&oh=684fd3e88d8fdedfae65baefc63642d3&oe=618EA439"
          style={{ height: "100%" }}
        />
      </Grid>
      <Grid
        item
        xs={3}
        style={{
          height: "33vh",
          marginTop: "1vh",
          marginBottom: "1vh",
          marginRight: "25vw",
          borderRadius: "4px",
          backgroundColor: "#424242",
        }}
      >
        <Grid
          item
          style={{
            paddingTop: "0.3vh",
            fontSize: "large",
            fontFamily: "Nunito",
            height: "3vh",
            backgroundColor: "#673AB7",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
          }}
        >
          Greg
        </Grid>
        <Grid item style={{ paddingTop: "1vh" }}>
          Greg comes from a long line of wealthy elites, and aims to take over
          the world one website at a time.
        </Grid>
      </Grid>
      {/* Takuya Section */}
      <Grid
        item
        xs={3}
        style={{
          height: "33vh",
          marginTop: "1vh",
          marginBottom: "1vh",
          marginLeft: "25vw",
          borderRadius: "4px",
          backgroundColor: "#424242",
        }}
      >
        <Grid
          item
          style={{
            paddingTop: "0.3vh",
            fontSize: "large",
            fontFamily: "Nunito",
            height: "3vh",
            backgroundColor: "#673AB7",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
          }}
        >
          Takuya
        </Grid>
        <Grid item style={{ paddingTop: "1vh" }}>
          Takuya comes from a long line of wealthy elites, and aims to take over
          the world one website at a time.
        </Grid>
      </Grid>
      <Grid
        item
        id="takuya"
        xs={3}
        style={{
          height: "33vh",
          marginTop: "1vh",
          marginBottom: "1vh",
          marginRight: "25vw",
        }}
      >
        <img
          src="https://scontent-nrt1-1.xx.fbcdn.net/v/t1.6435-9/72750529_2927365680624885_9078900207579561984_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=u9qvgKq2AmkAX_j31Kp&_nc_ht=scontent-nrt1-1.xx&oh=684fd3e88d8fdedfae65baefc63642d3&oe=618EA439"
          style={{ height: "100%" }}
        />
      </Grid>
    </Grid>
  );
  //   <div>About Us</div>;
}
