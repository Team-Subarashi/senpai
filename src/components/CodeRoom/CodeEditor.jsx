import React, { useRef, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";
import Editor from "@monaco-editor/react";
import "./CodeEditor.css";
import { loadedCSS, loadedHTML, loadedJS } from "../../atoms";

export const CodeEditor = ({ activeFiles }) => {
  const [fileName, setFileName] = useState();
  const [html, setHTML] = useRecoilState(loadedHTML);
  const [css, setCSS] = useRecoilState(loadedCSS);
  const [js, setJS] = useRecoilState(loadedJS);
  const editorRef = useRef(null);
  const doc = new Y.Doc();
  const type = doc.getText("monaco");
  const lessonId = window.location.href.split("room/")[1];
  const wsProvider = new WebsocketProvider(
    "ws://localhost:1234",
    lessonId,
    doc
  );

  const handleHTML = (
    value
    //  event
  ) => {
    setHTML(value);
  };
  const handleJS = (
    value
    //  event
  ) => {
    setJS(value);
  };
  const handleCSS = (
    value
    //  event
  ) => {
    setCSS(value);
  };

  const handleSave = async () =>
    // value, event
    {
      return await axios.patch(`/files/${activeFiles._id}`, {
        js: js,
        css: css,
        html: html,
      });
    };

  useEffect(() => {
    setHTML(activeFiles.html);
    setJS(activeFiles.js);
    setCSS(activeFiles.css);
  }, []);

  function handleEditorDidMount(editor) {
    // wsProvider.connect();
    editorRef.current = editor;
    new MonacoBinding(
      type,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      wsProvider.awareness
    );
  }

  return (
    <div>
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
        path={fileName}
        height="70vh"
        theme="vs-dark"
        defaultValue="hello"
        defaultLanguage={
          fileName === "script.js"
            ? "javascript"
            : fileName === "index.html"
            ? "xml"
            : "css"
        }
        onMount={handleEditorDidMount}
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
};

export default CodeEditor;
