import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import initSqlJs from "sql.js";

export default function SQLEditor() {
  const [code, setCode] = useState(`CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER);
INSERT INTO users (name, age) VALUES ('Alice', 25), ('Bob', 30);
SELECT * FROM users;`);
  const [output, setOutput] = useState([]);
  const dbRef = useRef(null);

  // Initialize SQL.js
  useEffect(() => {
    const initDB = async () => {
      const SQL = await initSqlJs({ locateFile: file => `https://sql.js.org/dist/${file}` });
      dbRef.current = new SQL.Database();
    };
    initDB();
  }, []);

  const runQuery = () => {
    if (!dbRef.current) return;
    setOutput([]);
    try {
      const res = dbRef.current.exec(code); // returns array of results
      if (res.length === 0) {
        setOutput(["Query executed successfully (no results)"]);
      } else {
        // Convert results to table-like string
        const tableStr = res
          .map(r => {
            const headers = r.columns.join(" | ");
            const rows = r.values.map(v => v.join(" | ")).join("\n");
            return `${headers}\n${rows}`;
          })
          .join("\n\n");
        setOutput([tableStr]);
      }
    } catch (err) {
      setOutput([err.message]);
    }
  };

  const clearOutput = () => setOutput([]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        runQuery();
      }
      if (e.key === "F7") {
        e.preventDefault();
        runQuery();
      }
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
      {/* Left: SQL Editor */}
      <div className="w-1/2 flex flex-col border-r border-gray-700">
        <Editor
          height="100%"
          language="sql"
          theme="vs-dark"
          value={code}
          onChange={setCode}
          options={{
            minimap: { enabled: false },
            automaticLayout: true,
            suggestOnTriggerCharacters: true,
          }}
        />
        <div className="flex">
          <button
            className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2"
            onClick={runQuery}
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

      {/* Right: Output */}
      <div className="w-1/2 bg-black text-white p-4 font-mono overflow-auto">
        {output.map((line, idx) => (
          <pre key={idx}>{line}</pre>
        ))}
      </div>
    </div>
  );
}
