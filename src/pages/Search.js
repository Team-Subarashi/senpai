import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { category as categoryAtom } from "../atoms";
import Filter from "../components/Filter";
import SenpaiList from "../components/SenpaiList";
import { Grid, Box, Button } from "@material-ui/core";

import axios from "axios";

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
          backgroundColor: "#616162",
          border: "1px solid white"
          // overflow: "scroll",
        }}
      >
        <SenpaiList />
      </Grid>
      {/* <Grid item xs={2}></Grid> */}
    </Grid>
  );
}
