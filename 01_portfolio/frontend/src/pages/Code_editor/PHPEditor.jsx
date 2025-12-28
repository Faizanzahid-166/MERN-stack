import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import initSqlJs from "sql.js";

export default function PHPEditor() {
  const phpRef = useRef(null);
  const dbRef = useRef(null);

  // Default code
  const defaultSQL =
    "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);\nINSERT INTO users (name) VALUES ('Alice');\nSELECT * FROM users;";
  const defaultPHP = "<?php echo 'Hello from PHP!'; ?>";

  // State
  const [sql, setSql] = useState(defaultSQL);
  const [php, setPhp] = useState(defaultPHP);
  const [sqlOutput, setSqlOutput] = useState([]);
  const [phpOutput, setPhpOutput] = useState("");

  // Initialize SQL.js
  useEffect(() => {
    const initDB = async () => {
      const SQL = await initSqlJs({ locateFile: file => `https://sql.js.org/dist/${file}` });
      dbRef.current = new SQL.Database();
    };
    initDB();
  }, []);

  // Initialize PHP via CDN
  useEffect(() => {
    const loadPHP = async () => {
      const { default: initPhp } = await import(
        "https://cdn.jsdelivr.net/gh/glayzzle/php-wasm@master/dist/php-wasm.js"
      );
      phpRef.current = await initPhp();
    };
    loadPHP();
  }, []);

  // Run SQL
  const runSQL = () => {
    if (!dbRef.current) return;
    setSqlOutput([]);
    try {
      const res = dbRef.current.exec(sql);
      if (res.length === 0) setSqlOutput(["Query executed successfully (no results)"]);
      else {
        const tableStr = res
          .map(r => {
            const headers = r.columns.join(" | ");
            const rows = r.values.map(v => v.join(" | ")).join("\n");
            return `${headers}\n${rows}`;
          })
          .join("\n\n");
        setSqlOutput([tableStr]);
      }
    } catch (err) {
      setSqlOutput([err.message]);
    }
  };

  // Run PHP
  const runPHP = () => {
    if (!phpRef.current) return;
    try {
      const result = phpRef.current.execute(php);
      setPhpOutput(result);
    } catch (err) {
      setPhpOutput(err.message);
    }
  };

  // Clear outputs
  const clearOutput = type => {
    if (type === "sql") setSqlOutput([]);
    if (type === "php") setPhpOutput("");
  };

  // Reset all editors
  const resetAll = () => {
    setSql(defaultSQL);
    setPhp(defaultPHP);
    clearOutput("sql");
    clearOutput("php");
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = e => {
      // Ctrl/Cmd + Enter → Run all
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        runSQL();
        runPHP();
      }
      // F7 → Run all
      if (e.key === "F7") {
        e.preventDefault();
        runSQL();
        runPHP();
      }
      // F8 → Clear outputs
      if (e.key === "F8") {
        e.preventDefault();
        clearOutput("sql");
        clearOutput("php");
      }
      // F6 → Reset editors
      if (e.key === "F6") {
        e.preventDefault();
        resetAll();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sql, php]);

  return (
    <div className="flex h-screen">
      {/* Left: Editors */}
      <div className="w-1/2 flex flex-col border-r border-gray-700 overflow-auto">
        {/* SQL Editor */}
        <div className="h-1/2 border-b border-gray-600">
          <Editor
            height="100%"
            language="sql"
            theme="vs-dark"
            value={sql}
            onChange={setSql}
            options={{ minimap: { enabled: false }, automaticLayout: true }}
          />
        </div>

        {/* PHP Editor */}
        <div className="h-1/2 border-b border-gray-600">
          <Editor
            height="100%"
            language="php"
            theme="vs-dark"
            value={php}
            onChange={setPhp}
            options={{ minimap: { enabled: false }, automaticLayout: true, suggestOnTriggerCharacters: true }}
          />
        </div>
      </div>

      {/* Right: Outputs */}
      <div className="w-1/2 bg-black text-white overflow-auto">
        {/* SQL Output */}
        <div className="h-1/2 border-b border-gray-700 p-2 font-mono overflow-auto">
          <h2 className="text-white">SQL Output:</h2>
          {sqlOutput.map((line, idx) => <pre key={idx}>{line}</pre>)}
        </div>

        {/* PHP Output */}
        <div className="h-1/2 p-2 font-mono overflow-auto">
          <h2 className="text-white">PHP Output:</h2>
          <pre>{phpOutput}</pre>
        </div>
      </div>
    </div>
  );
}
