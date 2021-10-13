import React from "react";
import Filter from "../components/Filter";
import SenpaiList from "../components/SenpaiList";
import Grid from "@material-ui/core/Grid";
import Vanta from "../components/Vanta";

export default function Search() {
  return (
    <Vanta>
      <Grid container>
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
          xs={12}
          style={{
            height: "95vh",
            width: "max-content",
            padding: "2rem",
            overflow: "scroll",
          }}
        >
          <SenpaiList />
        </Grid>
        {/* <Grid item xs={2}></Grid> */}
      </Grid>
    </Vanta>
  );
}
