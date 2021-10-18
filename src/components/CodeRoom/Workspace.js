import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import CodeView from "./CodeView";
import axios from "axios";
// import Video from "../Video";
import "./Workspace.css";
import CodeEditor from "./CodeEditor";
import { useRecoilState } from "recoil";
import { lessonState } from "../../atoms";

export default function Workspace() {
  const [activeFiles, setActiveFiles] = useState("");
  const [lesson, setLesson] = useRecoilState(lessonState);
  useEffect(async () => {
    const files = await axios.get("/files");
    setActiveFiles(files.data[0]);
    console.log(lesson);
    return () => {
      setLesson({});
    };
  }, []);

  return (
    <Grid
      container
      className="workspace"
      spacing={3}
      style={{
        height: "87vh",
      }}
    >
      <Grid
        item
        xs={5}
        spacing={3}
        style={{
          // marginLeft: "1vw",
          marginTop: "5vh",
          marginBottom: "5vh",
          marginLeft: "1px",
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
        }}
      >
        <CodeView />
      </Grid>
      {/* <Grid item xs={2} style={{ backgroundColor: "gray" }}>
        <Video lesson={lesson} />
      </Grid> */}
    </Grid>
  );
}
