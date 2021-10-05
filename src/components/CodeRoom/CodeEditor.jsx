import React, { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { firebaseConfig } from "../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { fromMonaco } from "fixedfirepad/firepad";
import "./CodeEditor.css";
import files from "./files";
import { useRecoilValueLoadable, useRecoilState } from "recoil";
import { fileQuery } from "../../atoms";
import axios from "axios";
import { loadedFiles, loadedCSS, loadedHTML, loadedJS } from "../../atoms";

function CodeEditor() {
  const editorRef = useRef(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [filesLoaded, setFilesLoaded] = useState(false);
  const [fileName, setFileName] = useState("script.js");
  const file = files[fileName];
  const lessonId = window.location.href.split("room/")[1];

  const [html, setHTML] = useRecoilState(loadedHTML);
  const [css, setCSS] = useRecoilState(loadedCSS);
  const [js, setJS] = useRecoilState(loadedJS);
  const [activeFiles, setActiveFiles] = useRecoilState(loadedFiles);

  useEffect(async () => {
    const files = await axios.get("/files");
    setActiveFiles(files.data[0]);
  }, []);

  useEffect(() => {
    setHTML(activeFiles.html);
    setJS(activeFiles.js);
    setCSS(activeFiles.css);


  }, [activeFiles]);

  useEffect(() => {
    console.log("Lesson ID is " + lessonId)
  }, [])

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
    return await axios.patch(`/files/${activeFiles._id}`, { js: js, css: css, html: html })
  }
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

    //TODO TRY ADDING LESSON ID AS REF
    const dbRef = firebase.database()
      .ref(
        // lessonId
      )
      .child(`${lessonId}`);
    const firepad = fromMonaco(dbRef, editorRef.current);
    const name = prompt("Enter your Name :");
    firepad.setUserName(name);
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
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={
          fileName === "script.js" ? js : fileName === "index.html" ? html : css
        }
        options={{ fontSize: 7 }}
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
