import React from "react";
import Filter from "../components/Filter";
import SenpaiList from "../components/SenpaiList";
import Grid from "@material-ui/core/Grid";

export default function Search() {
  return (
    // <div>
    <Grid container>
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
        xs={12}
        style={{
          height: "100vh",
          width: "max-content",
          overflowY: "scroll",
          paddingBottom: "5vh",
        }}
      >
        <SenpaiList />
      </Grid>
    </Grid>
    // </div>
  );
}
