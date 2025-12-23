import { useState } from "react";
import { createRepositoryProject } from "../../api/repository-projects";

const initialState = {
  Repository_Name: "",
  Repository_Project_Name: "",
  Project_Deploy_Url: "",
  Project_Image: "",
  Project_Description: "",
};

function InsertProjects() {
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
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add New Project
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="Repository_Name"
          placeholder="Repository Name"
          value={form.Repository_Name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        <input
          name="Repository_Project_Name"
          placeholder="Project Name"
          value={form.Repository_Project_Name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        <input
          name="Project_Deploy_Url"
          placeholder="Deploy URL"
          value={form.Project_Deploy_Url}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        <input
          name="Project_Image"
          placeholder="Image URL"
          value={form.Project_Image}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        <textarea
          name="Project_Description"
          placeholder="Description"
          value={form.Project_Description}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
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
