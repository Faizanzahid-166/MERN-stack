import React, { useContext } from "react";
import { Outlet } from "react-router";
import { Navbar,Footer } from "./layouts/00_index.js";
import ThemeContext from "./context/themeContext.js";

function App() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}>
      <Navbar />

    

       <main className="min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
