import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import CodeView from "./CodeView";
import axios from "axios";
import Video from "./Video";
// import FileControls from "./FileControls";
import "./Workspace.css";
import CodeEditor from "./CodeEditor";
import { useRecoilState, useRecoilValue } from "recoil";
import { lessonState, userState, loadedFiles } from "../../atoms";

export default function Workspace() {
  const [activeFiles, setActiveFiles] = useRecoilState(loadedFiles);
  const [lesson, setLesson] = useRecoilState(lessonState);
  const user = useRecoilValue(userState);

  useEffect(async () => {
    const files = await axios.get("/api/v1/files");
    files.data.filter((file) => (file.userId = user._id));
    console.log;
    setActiveFiles(files.data);
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
          height: "100%",
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
          height: "100%",
        }}
      >
        <CodeView />

        <Grid
          item
          xs={5}
          spacing={2}
          style={{
            marginTop: "4vh",
            marginLeft: "2vh",
            paddingLeft: "10rem",
            justifyContent: "space-around",
            display: "flex",
          }}
        >
          {/* <FileControls item /> */}

          <Video lesson={lesson} />
        </Grid>
      </Grid>
    </Grid>
  );
}
