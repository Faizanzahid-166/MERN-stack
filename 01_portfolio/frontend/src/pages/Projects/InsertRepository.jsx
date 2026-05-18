import { useState, useContext } from "react";
import { createRepositoryLists } from "../../api/repository-projects";
import ThemeContext from "../../context/themeContext.js";
import { Link } from "react-router";

const initialState = {
  Repository_Name: "",
  Repository_Description: "",
  Repository_URI: "",
  Repository_Image: "",
};

function InsertRepository() {
  const { darkMode } = useContext(ThemeContext);
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createRepositoryLists(form); // ✅ FIXED
      alert(`Repository added successfully! Id: ${res.data.Id}`);
      setForm(initialState);
    } catch (err) {
      console.error(err);
      alert("Failed to add repository");
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
          to="/projects/insertProjects"
          className="px-6 py-2 m-1 bg-yellow-800 text-white rounded-md hover:bg-yellow-600"
        >
          InsertProjects
        </Link>
      <h2 className="text-2xl p-2 font-bold mb-6 text-center">
        Add Repository
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
          name="Repository_URI"
          placeholder="GitHub Repository URL"
          value={form.Repository_URI}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
            darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"
          }`}
        />

        <input
          name="Repository_Image"
          placeholder="Repository Image URL"
          value={form.Repository_Image}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
            darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"
          }`}
        />

        <textarea
          name="Repository_Description"
          placeholder="Repository Description"
          value={form.Repository_Description}
          onChange={handleChange}
          rows={4}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 resize-none ${
            darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"
          }`}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold ${
            loading ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Saving..." : "Add Repository"}
        </button>
      </form>
    </div>
  );
}

export default InsertRepository;
