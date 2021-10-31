import React, { useRef, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";
import Editor from "@monaco-editor/react";
import "./CodeEditor.css";
import { loadedCSS, loadedHTML, loadedJS } from "../../atoms";
import debounce from "lodash/debounce";

export const CodeEditor = ({ activeFiles }) => {
  const [fileName, setFileName] = useState("index.htmn");
  const [html, setHTML] = useRecoilState(loadedHTML);
  const [css, setCSS] = useRecoilState(loadedCSS);
  const [js, setJS] = useRecoilState(loadedJS);
  const editorRef = useRef(null);

  // const jsDoc = new Y.Doc();
  const cssDoc = new Y.Doc();
  const htmlDoc = new Y.Doc();
  // const jsType = jsDoc.getText("monaco");
  const cssType = cssDoc.getText("monaco");
  const htmlType = htmlDoc.getText("monaco");

  const lessonId = window.location.href.split("room/")[1];
  const wsProvider = new WebsocketProvider(
    "ws://localhost:1234",
    lessonId,
    htmlDoc
  );

  const handleHTML = (value) => {
    const debounceHTML = debounce(setHTML, 500);
    debounceHTML(value);
  };
  const handleJS = (value) => {
    const debounceJS = debounce(setJS, 500);
    debounceJS(value);
  };
  const handleCSS = (value) => {
    const debounceCSS = debounce(setCSS, 500);
    debounceCSS(value);
  };

  const handleSave = async () => {
    return await axios.patch(`/api/v1/files/${activeFiles._id}`, {
      js: js,
      css: css,
      html: html,
    });
  };

  const handleJSButtonClick = () => {
    setFileName("script.js");
  };
  const handleCSSButtonClick = () => {
    setFileName("style.css");
    new MonacoBinding(
      cssType,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      wsProvider.awareness
    );
  };
  const handleHTMLButtonClick = () => {
    setFileName("index.html");
    new MonacoBinding(
      htmlType,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      wsProvider.awareness
    );
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
      htmlType,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      wsProvider.awareness
    );
  }

  return (
    <div>
      <button disabled={fileName === "script.js"} onClick={handleJSButtonClick}>
        script.js
      </button>
      <button
        disabled={fileName === "style.css"}
        onClick={handleCSSButtonClick}
      >
        style.css
      </button>
      <button
        disabled={fileName === "index.html"}
        onClick={handleHTMLButtonClick}
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
