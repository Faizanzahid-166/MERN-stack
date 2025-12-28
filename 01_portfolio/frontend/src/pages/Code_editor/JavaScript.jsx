import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

export default function JavaScript() {
  const [code, setCode] = useState(`console.log("Hello World");`);
  const outputRef = useRef(null);

  const appendOutput = (message, color = "white") => {
    const outputDiv = outputRef.current;
    if (!outputDiv) return;
    const p = document.createElement("div");
    p.style.color = color;
    if (typeof message === "object") {
      p.textContent = JSON.stringify(message, null, 2);
    } else {
      p.textContent = message;
    }
    outputDiv.appendChild(p);
    outputDiv.scrollTop = outputDiv.scrollHeight; // auto scroll
  };

  const clearOutput = () => {
    if (outputRef.current) outputRef.current.innerHTML = "";
  };

  const runCode = () => {
    clearOutput();

    const originalLog = console.log;
    console.log = (...args) => {
      args.forEach(arg => appendOutput(arg));
    };

    try {
      new Function(code)();
    } catch (err) {
      appendOutput(err, "red");
    }

    console.log = originalLog;
  };

useEffect(() => {
  const handleKeyDown = (e) => {
    // Ctrl/Cmd + Enter → Run code
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runCode();
    }
    // F7 → Run code
    if (e.key === "F7") {
      e.preventDefault();
      runCode();
    }
    // F8 → Clear output
    if (e.key === "F8") {
      e.preventDefault();
      clearOutput();
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [code]);



  return (
    <div className="flex h-screen">
      {/* Left: Editor */}
      <div className="w-1/2 flex flex-col border-r border-gray-600">
        <Editor
          height="100%"
          language="javascript"
          theme="vs-dark"
          value={code}
          onChange={setCode}
          options={{
            automaticLayout: true,
            suggestOnTriggerCharacters: true,
            wordBasedSuggestions: true,
            minimap: { enabled: false },
          }}
        />
        <div className="flex">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 w-1/2"
            onClick={runCode}
          >
            Run JS
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-800 text-white py-2 w-1/2"
            onClick={clearOutput}
          >
            Clear Output
          </button>
        </div>
      </div>

      {/* Right: Output */}
      <div
        ref={outputRef}
        className="w-1/2 bg-gray-900 text-white p-4 font-mono overflow-y-auto"
      >
        Output will appear here
      </div>
    </div>
  );
}
