import React from "react";
import Filter from "../components/Filter";
import SenpaiList from "../components/SenpaiList";
import Grid from "@material-ui/core/Grid";

export default function Search() {
  return (
    <>
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
            height: "87vh",
            width: "max-content",
            overflow: "scroll",
          }}
        >
          <SenpaiList />
        </Grid>
      </Grid>
    </>
  );
}
