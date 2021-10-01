import React, { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { firebaseConfig } from "../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { fromMonaco } from "@hackerrank/firepad";
import "./CodeEditor.css";
import files from "./files";

function CodeEditor() {
  const editorRef = useRef(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [activeText, setActiveText] = useState("");
  const [fileName, setFileName] = useState("script.js");
  const file = files[fileName];

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

    const dbRef = firebase.database().ref().child(`pair001`);
    const firepad = fromMonaco(dbRef, editorRef.current);
    const name = prompt("Enter your Name :");
    firepad.setUserName(name);
  }, [editorLoaded]);

  const handleChange = (value, event) => {
    setActiveText(value);
    console.log(activeText);
  };
    
    
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
      <Editor
        height="70vh"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
      />
    </div>
  );
}

export default CodeEditor;
