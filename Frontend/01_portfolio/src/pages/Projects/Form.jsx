import { useState, useEffect } from "react";
import { createProject } from "../../api/addprojectApi.js";

export default function Form() {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    img: "",
    codelink: "",
    projectlink: "",
    category: ""
  });
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  if (!token) {
    return (
      <div className="text-center mt-10 text-red-600">
        ❌ Access Denied. Please login as admin.
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(formData, token);
      alert("✅ Project added!");
      setFormData({
        title: "",
        desc: "",
        img: "",
        codelink: "",
        projectlink: "",
        category: ""
      });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add project");
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {["title", "desc", "img", "codelink", "projectlink", "category"].map(
          (field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field}
              value={formData[field]}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md"
              required
            />
          )
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add Project
        </button>
      </form>
    </section>
  );
}
