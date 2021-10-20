import React, { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { firebaseConfig } from "../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { fromMonaco } from "fixedfirepad/firepad";
import "./CodeEditor.css";
import { useRecoilState } from "recoil";
import axios from "axios";
import { loadedCSS, loadedHTML, loadedJS } from "../../atoms";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FileControls from "./FileControls";

function CodeEditor({ activeFiles, user }) {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const jsEditorRef = useRef(null);
  const cssEditorRef = useRef(null);
  const htmlEditorRef = useRef(null);

  const [fileName, setFileName] = useState("script.js");
  const [saveFileName, setSaveFileName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [loadedFile, setLoadedFile] = useState("");
  const [html, setHTML] = useRecoilState(loadedHTML);
  const [css, setCSS] = useRecoilState(loadedCSS);
  const [js, setJS] = useRecoilState(loadedJS);

  const lessonId = window.location.href.split("room/")[1];

  useEffect(async () => {
    setLoadedFile(activeFiles[0]);
    setHTML(loadedFile.html);
    setJS(loadedFile.js);
    setCSS(loadedFile.css);
    console.log(loadedFile, "Hello");
  }, [loadedFile]);

  const handleHTML = (value) => {
    setHTML(value);
  };
  const handleJS = (value) => {
    setJS(value);
  };
  const handleCSS = (value) => {
    setCSS(value);
  };

  const handleSave = async () => {
    if (loadedFile.name === saveFileName) {
      await axios.patch(`/files/${saveFileName}`, {
        js: js,
        css: css,
        html: html,
        userId: user._id,
        name: saveFileName,
      });
      handleModalClose();
    } else {
      await axios.post(`/files/`, {
        js: js,
        css: css,
        html: html,
        userId: user._id,
        name: saveFileName,
      });
      handleModalClose();
    }
  };

  function handleJSEditorDidMount(editor) {
    console.log("js");
    jsEditorRef.current = editor;
    const jsDbRef = firebase.database().ref().child(`${lessonId}/script`);
    const jsFirepad = fromMonaco(jsDbRef, jsEditorRef.current);
    jsFirepad.setUserName(user.name || "Default");
  }
  function handleCSSEditorDidMount(editor) {
    cssEditorRef.current = editor;
    const cssDbRef = firebase.database().ref().child(`${lessonId}/css`);
    const cssFirepad = fromMonaco(cssDbRef, cssEditorRef.current);
    cssFirepad.setUserName(user.name || "Default");
  }
  function handleHTMLEditorDidMount(editor) {
    console.log("html");
    htmlEditorRef.current = editor;
    const htmlDbRef = firebase.database().ref().child(`${lessonId}/html`);
    const htmlFirepad = fromMonaco(htmlDbRef, htmlEditorRef.current);
    htmlFirepad.setUserName(user.name || "Default");
  }

  function handleTabChange(event, value) {
    setFileName(value);
    console.log(fileName);
  }
  function handleFileName(event) {
    console.log(event.target.value);
    setSaveFileName(event.target.value);
  }

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
  }, []);

  return (
    <div id="editor-container">
      <Box
        sx={{ width: "100%", height: "10%", border: "none", display: "flex" }}
      >
        <Tabs
          value={fileName}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
          orientation="horizontal"
          centered
        >
          <Tab
            sx={{ height: "15px", width: "20px", color: "#b4f9f8" }}
            value="script.js"
            label="script.js"
          />
          <Tab
            sx={{ height: "15px", width: "20px", color: "#b4f9f8" }}
            value="style.css"
            label="style.css"
          />
          <Tab
            sx={{ height: "10px", width: "20px", color: "#b4f9f8" }}
            value="index.html"
            label="index.html"
          />
        </Tabs>
        <Button
          onClick={handleModalOpen}
          color="secondary"
          variant="contained"
          style={{
            marginLeft: "20vh",
            marginTop: "1.5vh",
            marginBottom: "1vh",
            paddingBottom: "1vh",
            marginRight: "2rem",
            height: "4vh",
            width: "15vh",
          }}
        >
          Save As
        </Button>
        <FileControls activeFiles={activeFiles} />
        <Modal open={modalOpen} onClose={handleModalClose}>
          <Box sx={modalStyle}>
            <TextField label="File Name" onChange={handleFileName} />
            <Button onClick={handleSave}>Save</Button>
          </Box>
        </Modal>
      </Box>

      {fileName === "script.js" && (
        <Editor
          height="70vh"
          theme="vs-dark"
          onMount={handleJSEditorDidMount}
          defaultLanguage="javascript"
          value={js}
          options={{ fontSize: 12 }}
          onChange={handleJS}
        />
      )}
      {fileName === "style.css" && (
        <Editor
          height="70vh"
          theme="vs-dark"
          onMount={handleCSSEditorDidMount}
          defaultLanguage="css"
          value={css}
          options={{ fontSize: 12 }}
          onChange={handleCSS}
        />
      )}
      {fileName === "index.html" && (
        <Editor
          height="70vh"
          theme="vs-dark"
          onMount={handleHTMLEditorDidMount}
          defaultLanguage="html"
          value={html}
          options={{ fontSize: 12 }}
          onChange={handleHTML}
        />
      )}
    </div>
  );
}

export default CodeEditor;
