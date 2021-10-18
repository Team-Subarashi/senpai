import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import CodeView from "./CodeView";
import axios from "axios";
import Video from "../Video";
import "./Workspace.css";
import CodeEditor from "./CodeEditor";
import { useRecoilState, useRecoilValue } from "recoil";
import { lessonState, userState } from "../../atoms";

export default function Workspace() {
  const [activeFiles, setActiveFiles] = useState("");
  const [lesson, setLesson] = useRecoilState(lessonState);
  const user = useRecoilValue(userState);
  console.log(user);

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
        height: "100%",
        justifyContent: "space-around",
        // backgroundColor: "red"
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
          <CodeEditor activeFiles={activeFiles} user={user} />
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
      <Grid item xs={2}>
        <Video lesson={lesson} />
      </Grid>
    </Grid>
  );
}
