import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Stack } from "@mui/material";
import CodeView from "../components/CodeRoom/CodeView";
import { useRecoilState } from "recoil";
import axios from "axios";

// import Video from "../components/Video";
import CodeEditor from "../components/CodeRoom/CodeEditor";
// import CodeView from "../components/CodeRoom/CodeView";

export default function Workspace() {
  
  const [activeFiles, setActiveFiles] = useState("")
  useEffect(async () => {
    const files = await axios.get("/files");
    setActiveFiles(files.data[0]);
  }, []);
  
  return (
    <Grid
      container
      // justifyContent="space-around"
      style={{ height: "87vh", backgroundColor: "red" }}
    >
      <Grid
        item
        xs={5}
        style={{
          // marginLeft: "1vw",
          marginTop: "5vh",
          marginBottom: "5vh",
          backgroundColor: "lightblue",
        }}
      >
        <React.Suspense fallback={<div>Loading...</div>}>
          <CodeEditor activeFiles={activeFiles}/>
        </React.Suspense>
      </Grid>
      <Grid
        item
        xs={5}
        style={{
          // marginLeft: "1vw",
          marginTop: "5vh",
          marginBottom: "5vh",
          backgroundColor: "lightpink",
        }}
      >
        <CodeView/>
      </Grid>
      <Grid item xs={2} style={{ backgroundColor: "gray" }}>
        <Stack spacing={2}>
          <div>Video Comp 1</div>
          <div>Video Comp 2</div>
        </Stack>
      </Grid>
      {/* <Video /> */}
    </Grid>
  );
}
