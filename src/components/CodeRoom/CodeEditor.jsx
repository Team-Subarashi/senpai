import React, { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { firebaseConfig } from "../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { fromMonaco } from "@hackerrank/firepad";
import "./CodeEditor.css";
import { useRecoilValueLoadable, useRecoilState } from "recoil";
import { fileQuery } from "../../atoms";
import axios from "axios";
import { loadedFiles, loadedCSS, loadedHTML, loadedJS } from "../../atoms";

function CodeEditor({ activeFiles }) {
  const editorRef = useRef(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [fileName, setFileName] = useState("script.js");

  const [html, setHTML] = useRecoilState(loadedHTML);
  const [css, setCSS] = useRecoilState(loadedCSS);
  const [js, setJS] = useRecoilState(loadedJS);
  // const [activeFiles, setActiveFiles] = useRecoilState(loadedFiles);

  // useEffect(async () => {
  //   const files = await axios.get("/files");
  //   setActiveFiles(files.data[0]);
  // }, []);

  useEffect(() => {
    setHTML(activeFiles.html);
    setJS(activeFiles.js);
    setCSS(activeFiles.css);
  }, [activeFiles]);

  const handleHTML = (value, event) => {
    setHTML(value);
  };
  const handleJS = (value, event) => {
    setJS(value);
  };
  const handleCSS = (value, event) => {
    setCSS(value);
  };

  const handleSave = async (value, event) => {
    return await axios.patch(`/files/${activeFiles._id}`, {
      js: js,
      css: css,
      html: html,
    });
  };
  // const loadedFiles = useRecoilValueLoadable(fileQuery)

  // const loadedFilesJS =  loadedFiles.contents.data.js
  // const loadedFilesCSS = loadedFiles.contents.data.css
  // const loadedFilesHTML = loadedFiles.contents.data.html

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    setEditorLoaded(true);
  }

  useEffect(() => {
    // if (!firebase.app.length) {
    //   firebase.initializeApp(firebaseConfig);
    // } else {
    //   firebase.app();
    // }

    firebase.initializeApp(firebaseConfig);
  }, []);

  useEffect(() => {
    if (!editorLoaded) {
      return;
    }

    const dbRef = firebase.database().ref().child(`pair004`);
    const firepad = fromMonaco(dbRef, editorRef.current);

    try {
      const name = prompt("Enter your Name :"); // Name to highlight who is editing where in the code
      if (name) {
        firepad.setUserName(name);
      }
    } catch (err) {
      console.log(err);
    }
  }, [editorLoaded]);

  return (
    <div id="editor-container">
      <button
        disabled={fileName === "script.js"}
        onClick={() => setFileName("script.js")}
      >
        script.js
      </button>
      <button
        disabled={fileName === "style.css"}
        onClick={() => setFileName("style.css")}
      >
        style.css
      </button>
      <button
        disabled={fileName === "index.html"}
        onClick={() => setFileName("index.html")}
      >
        index.html
      </button>
      <button onClick={handleSave}>Save</button>
      <Editor
        height="70vh"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        path={fileName}
        // defaultLanguage={file.language}
        defaultValue={
          fileName === "script.js" ? js : fileName === "index.html" ? html : css
        }
        options={{ fontSize: 8 }}
        onChange={
          fileName === "script.js"
            ? handleJS
            : fileName === "index.html"
            ? handleHTML
            : handleCSS
        }
      />
    </div>
  );
}

export default CodeEditor;
