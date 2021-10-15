import React from "react";
import Filter from "../components/Filter";
import SenpaiList from "../components/SenpaiList";
import Grid from "@material-ui/core/Grid";

export default function Search() {
  return (
    <Grid container style={{}}>
      <Grid
        item
        xs={12}
        style={{
          height: "5vh",
        }}
      >
        <Filter />
      </Grid>

      <Grid
        id="senpai-list"
        item
        xs={10}
        style={{
          marginLeft: "8.5vw",
          backgroundColor: "#616162",
        }}
      >
        <SenpaiList />
      </Grid>
    </Grid>
  );
}
