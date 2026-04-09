import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";

export default function HTMLPlayground() {
  const iframeRef = useRef(null);

  const [code, setCode] = useState(`<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial;
      background: #111;
      color: white;
      padding: 20px;
    }
    button {
      padding: 10px 15px;
      background: dodgerblue;
      color: white;
      border: none;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>Hello World</h1>
  <button onclick="sayHi()">Click me</button>

  <script>
    function sayHi() {
      alert("Hello from iframe!");
    }
  </script>
</body>
</html>`);

  const runCode = () => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = code;
    }
  };

  const clearOutput = () => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = "";
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        runCode();
      }
      if (e.key === "F7") {
        e.preventDefault();
        runCode();
      }
      if (e.key === "F8") {
        e.preventDefault();
        clearOutput();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [code]);

  // Enable HTML Emmet suggestions
  const handleEditorWillMount = (monacoInstance) => {
    monacoInstance.languages.html.htmlDefaults.setOptions({
      suggest: { showWords: true },
      suggestOnTriggerCharacters: true,
      validate: true,
      format: { enable: true },
      hover: true,
      links: true,
    });
  };

  return (
    <div className="flex h-screen">
      {/* Left: HTML Editor */}
      <div className="w-1/2 flex flex-col border-r border-gray-700">
        <Editor
          height="100%"
          language="html"
          theme="vs-dark"
          value={code}
          beforeMount={handleEditorWillMount}
          onChange={setCode}
          options={{
            minimap: { enabled: false },
            automaticLayout: true,
            suggestOnTriggerCharacters: true,
            wordBasedSuggestions: true,
          }}
        />

        <div className="flex">
          <button
            className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2"
            onClick={runCode}
          >
            Run (Ctrl+Enter / F7)
          </button>

          <button
            className="w-1/2 bg-gray-700 hover:bg-gray-800 text-white py-2"
            onClick={clearOutput}
          >
            Clear (F8)
          </button>
        </div>
      </div>

      {/* Right: Preview Page */}
      <div className="w-1/2 bg-black">
        <iframe
          ref={iframeRef}
          title="preview"
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-modals"
        />
      </div>
    </div>
  );
}
