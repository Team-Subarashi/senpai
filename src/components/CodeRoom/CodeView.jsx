import React, { useEffect, useState } from "react";
import { loadedCSS, loadedHTML, loadedJS } from "../../atoms";
import { useRecoilValue } from "recoil";

const CodeView = () => {
  const html = useRecoilValue(loadedHTML);
  const js = useRecoilValue(loadedJS);
  const css = useRecoilValue(loadedCSS);

  const [srcDoc, setSrcDoc] = useState("");

  const createSrcDoc = () => {
    if (html) {
      const headIndex = html.indexOf("<head>");
      const firstHTML = html.slice(0, headIndex);
      const secondHTML = html.slice(headIndex, html.length - 1);
      const src = `${firstHTML} <style> ${css} </style> ${secondHTML}`;
      return src;
      }
      return;
  };

  useEffect(() => {
    setSrcDoc(createSrcDoc());
  }, [html, js, css]);

  return (
    <div>
      <iframe srcDoc={srcDoc} sandbox="allow-scripts" />
    </div>
  );
};

export default CodeView;
