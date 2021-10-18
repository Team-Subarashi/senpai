import React, { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { firebaseConfig } from "../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { fromMonaco } from "fixedfirepad/firepad";
import "./CodeEditor.css";
import { useRecoilState } from "recoil";
// import axios from "axios";
import { loadedCSS, loadedHTML, loadedJS } from "../../atoms";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function CodeEditor({ activeFiles }) {
  const jsEditorRef = useRef(null);
  const cssEditorRef = useRef(null);
  const htmlEditorRef = useRef(null);

  const [fileName, setFileName] = useState("script.js");

  const lessonId = window.location.href.split("room/")[1];
  // const user = useRecoilValue(userState);
  const [html, setHTML] = useRecoilState(loadedHTML);
  const [css, setCSS] = useRecoilState(loadedCSS);
  const [js, setJS] = useRecoilState(loadedJS);

  useEffect(() => {
    setHTML(activeFiles.html);
    setJS(activeFiles.js);
    setCSS(activeFiles.css);
  }, []);

  const handleHTML = (value) => {
    setHTML(value);
    console.log(html);
  };
  const handleJS = (value) => {
    setJS(value);
    console.log(js);
  };
  const handleCSS = (value) => {
    setCSS(value);
    console.log(css);
  };

  // const handleSave = async () => {
  //   return await axios.patch(`/files/${activeFiles._id}`, {
  //     js: js,
  //     css: css,
  //     html: html,
  //   });
  // };

  function handleJSEditorDidMount(editor) {
    jsEditorRef.current = editor;

    const jsDbRef = firebase.database().ref().child(`${lessonId}/script`);
    const jsFirepad = fromMonaco(jsDbRef, jsEditorRef.current);
    jsFirepad.setUserName("stephen");
  }
  function handleCSSEditorDidMount(editor) {
    cssEditorRef.current = editor;
    const cssDbRef = firebase.database().ref().child(`${lessonId}/css`);
    const cssFirepad = fromMonaco(cssDbRef, cssEditorRef.current);
    cssFirepad.setUserName("stephen");
  }
  function handleHTMLEditorDidMount(editor) {
    htmlEditorRef.current = editor;
    const htmlDbRef = firebase.database().ref().child(`${lessonId}/html`);
    const htmlFirepad = fromMonaco(htmlDbRef, htmlEditorRef.current);
    htmlFirepad.setUserName("stephen");
  }

  function handleTabChange(event, value) {
    setFileName(value);
    console.log(fileName);
  }

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
  }, []);

  return (
    <div id="editor-container">
      <Box sx={{ width: "100%", height: "10%", border: "none" }}>
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
      </Box>

      {fileName === "script.js" && (
        <Editor
          height="70vh"
          theme="vs-dark"
          onMount={handleJSEditorDidMount}
          defaultLanguage="javascript"
          defaultValue="hello js"
          options={{ fontSize: 10 }}
          onChange={handleJS}
        />
      )}
      {fileName === "style.css" && (
        <Editor
          height="70vh"
          theme="vs-dark"
          onMount={handleCSSEditorDidMount}
          defaultLanguage="css"
          defaultValue="hello cs"
          options={{ fontSize: 10 }}
          onChange={handleCSS}
        />
      )}
      {fileName === "index.html" && (
        <Editor
          height="70vh"
          theme="vs-dark"
          onMount={handleHTMLEditorDidMount}
          defaultLanguage="html"
          defaultValue="hello html"
          options={{ fontSize: 10 }}
          onChange={handleHTML}
        />
      )}
    </div>
  );
}

export default CodeEditor;
