import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import CodeView from "../components/CodeRoom/CodeView";
import axios from "axios";
import Video from "../components/Video";

import CodeEditor from "../components/CodeRoom/CodeEditor";
import { useRecoilState } from "recoil";
import { lessonState } from "../atoms";

export default function Workspace() {
  const [activeFiles, setActiveFiles] = useState("");
  const [lesson, setLesson] = useRecoilState(lessonState);
  useEffect(async () => {
    const files = await axios.get("/files");
    setActiveFiles(files.data[0]);

    return () => {
      setLesson({});
    };
  }, []);

  return (
    <Grid
      container
      // justifyContent="space-around"
      style={{
        height: "87vh",
        // backgroundColor: "red"
      }}
    >
      <Grid
        item
        xs={5}
        style={{
          // marginLeft: "1vw",
          marginTop: "5vh",
          marginBottom: "5vh",
          // backgroundColor: "lightblue",
        }}
      >
        <React.Suspense fallback={<div>Loading...</div>}>
          <CodeEditor activeFiles={activeFiles} />
        </React.Suspense>
      </Grid>
      <Grid
        item
        xs={5}
        style={{
          // marginLeft: "1vw",
          marginTop: "5vh",
          marginBottom: "5vh",
          // backgroundColor: "lightpink",
        }}
      >
        <CodeView />
      </Grid>
      <Grid item xs={2} style={{ backgroundColor: "gray" }}>
        <Video lesson={lesson} />
      </Grid>
    </Grid>
  );
}
