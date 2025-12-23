import { Routes, Route } from "react-router-dom";
import Login from "./page/Login.jsx";
import Register from "./page/Register.jsx";
import ChatBook from "./page/ChatBook.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={<ChatBook />} />
    </Routes>
  );
}
