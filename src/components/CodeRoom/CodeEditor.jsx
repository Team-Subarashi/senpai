import React, { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { firebaseConfig } from "../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { fromMonaco } from "fixedfirepad/firepad";
import "./CodeEditor.css";

import {
  //  useRecoilValueLoadable,
   useRecoilState } from "recoil";
import axios from "axios";
import {
  //  loadedFiles,
    loadedCSS, loadedHTML, loadedJS } from "../../atoms";

function CodeEditor({ activeFiles }) {
  const editorRef = useRef(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [fileName, setFileName] = useState("script.js");
  const lessonId = window.location.href.split("room/")[1];


  const [html, setHTML] = useRecoilState(loadedHTML);
  const [css, setCSS] = useRecoilState(loadedCSS);
  const [js, setJS] = useRecoilState(loadedJS);
  // const [activeFiles, setActiveFiles] = useRecoilState(loadedFiles);

  useEffect(() => {
    setHTML(activeFiles.html);
    setJS(activeFiles.js);
    setCSS(activeFiles.css);
    console.log(activeFiles)
  }, [activeFiles]);

  const handleHTML = (value,
    //  event
     ) => {
    setHTML(value);
  };
  const handleJS = (value,
    //  event
     ) => {
    setJS(value);
  };
  const handleCSS = (value,
    //  event
     ) => {
    setCSS(value);
  };

  const handleSave = async (
    // value, event
    ) => {
    return await axios.patch(`/files/${activeFiles._id}`, {
      js: js,
      css: css,
      html: html,
    });
  };
  // const loadedFiles = useRecoilValueLoadable(fileQuery)


  function handleEditorDidMount(editor, 
    // monaco
    ) {
    editorRef.current = editor;
    setEditorLoaded(true);
  }

  useEffect(() => {

    firebase.initializeApp(firebaseConfig);
  }, []);

  useEffect(() => {
    if (!editorLoaded) {
      return;
    }

    //TODO TRY ADDING LESSON ID AS REF
    const dbRef = firebase.database().ref().child(`${lessonId}`);
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
        defaultLanguage={fileName === "script.js" ? "javascript" : fileName === "index.html" ? "xml" : "css"}
        value={
          fileName === "script.js" ? js : fileName === "index.html" ? html : fileName === "style.css" ? css : ""
        }
        options={{ fontSize: 9 }}
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
