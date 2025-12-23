import { useState } from "react";
import { createRepositoryLists } from "../../api/repository-projects";

const initialState = {
  Repository_Name: "",
  Repository_Description: "",
  Repository_URI: "",
  Repository_Image: "",
};

function InsertRepository() {
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
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Add Repository
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="Repository_Name"
          placeholder="Repository Name"
          value={form.Repository_Name}
          onChange={handleChange}
          required
          className="input"
        />

        <input
          name="Repository_URI"
          placeholder="GitHub Repository URL"
          value={form.Repository_URI}
          onChange={handleChange}
          className="input"
        />

        <input
          name="Repository_Image"
          placeholder="Repository Image URL"
          value={form.Repository_Image}
          onChange={handleChange}
          className="input"
        />

        <textarea
          name="Repository_Description"
          placeholder="Repository Description"
          value={form.Repository_Description}
          onChange={handleChange}
          rows={4}
          className="input resize-none"
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
