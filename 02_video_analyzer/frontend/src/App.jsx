import { Routes, Route } from "react-router-dom";
import Video from "./page/Video.jsx";
export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Video />} />
    </Routes>
  );
}
