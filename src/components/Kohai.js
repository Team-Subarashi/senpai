import React from "react";
import { Grid, Box, Button } from "@material-ui/core";

const Kohai = () => {
  return (
    <Grid
      container
      xs={12}
      style={{
        margin: "2",
        backgroundColor: "yellow",
        height: "100vh",
      }}
    >
      <Grid
        item
        xs={12}
        style={{
          height: "10vh",
          backgroundColor: "green",
        }}
      >
        Kohai name or title here
      </Grid>
      <Grid
        item
        xs={4}
        style={{
          height: "90vh",
          backgroundColor: "lightgreen",
        }}
      >
        <Grid style={{ height: "10vh", backgroundColor: "blue" }}>detail</Grid>
      </Grid>
      <Grid
        item
        xs={8}
        style={{ height: "90vh", backgroundColor: "red" }}
      ></Grid>
    </Grid>
  );
};
export default Kohai;
