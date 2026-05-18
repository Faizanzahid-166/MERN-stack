import { useState, useContext } from "react";
import { createRepositoryProject } from "../../api/repository-projects";
import ThemeContext from "../../context/themeContext.js";
import {Link} from 'react-router'

const initialState = {
  Repository_Name: "",
  Repository_Project_Name: "",
  Project_Deploy_Url: "",
  Project_Image: "",
  Project_Description: "",
};

function InsertProjects() {
  const { darkMode } = useContext(ThemeContext);
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createRepositoryProject(form);
      console.log("Inserted:", res);

      alert(`Project added successfully! Id: ${res.data.Id}`);
      setForm(initialState);
    } catch (err) {
      console.error(err);
      alert("Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-xl mx-auto mt-10 p-8 rounded-2xl shadow-lg transition-colors duration-300 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
     <Link
          to="/auth/dashboard"
          className="px-6 py-2 m-1 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Dashboard
        </Link>
         <Link
          to="/projects/insertRepository"
          className="px-6 py-2 m-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          InsertRepository
        </Link>
      <h2 className={`text-2xl p-2 font-bold mb-6 text-center ${darkMode ? "text-white" : "text-gray-800"}`}>
        Add New Project
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="Repository_Name"
          placeholder="Repository Name"
          value={form.Repository_Name}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
            darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"
          }`}
        />

        <input
          name="Repository_Project_Name"
          placeholder="Project Name"
          value={form.Repository_Project_Name}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
            darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"
          }`}
        />

        <input
          name="Project_Deploy_Url"
          placeholder="Deploy URL"
          value={form.Project_Deploy_Url}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
            darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"
          }`}
        />

        <input
          name="Project_Image"
          placeholder="Image URL"
          value={form.Project_Image}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
            darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"
          }`}
        />

        <textarea
          name="Project_Description"
          placeholder="Description"
          value={form.Project_Description}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 resize-none ${
            darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"
          }`}
          rows={4}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 mt-2 rounded-lg text-white font-semibold transition 
            ${loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
        >
          {loading ? "Saving..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}

export default InsertProjects;
