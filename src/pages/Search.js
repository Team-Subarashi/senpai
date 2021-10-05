import React from "react";
import Filter from "../components/Filter";
import SenpaiList from "../components/SenpaiList";
import { Grid } from "@material-ui/core";

export default function Search() {
  return (
    <Grid container style={{}}>
      <Grid
        item
        xs={12}
        style={{
          height: "5vh",
          //   backgroundColor: "red"
        }}
      >
        <Filter />
      </Grid>
      {/* <Grid item xs={2}></Grid> */}

      <Grid
        id="senpai-list"
        item
        xs={10}
        style={{
          marginLeft: "8.5vw",
          marginTop: "3vh",
          // height: "80vh",
          backgroundColor: "lightblue",
          // overflow: "scroll",
        }}
      >
        <SenpaiList />
      </Grid>
      {/* <Grid item xs={2}></Grid> */}
    </Grid>
  );
}
