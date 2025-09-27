import { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../../api/addprojectApi.js";

export default function RepoManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await getProjects();
      // ✅ handle if backend returns array directly or inside .data
      const data = Array.isArray(res.data) ? res.data : res;
      setProjects(data || []);
    } catch (err) {
      console.error("❌ Failed to load projects:", err);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteProject(id);
      loadProjects(); // reload after delete
    } catch (err) {
      console.error("❌ Failed to delete project:", err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading projects...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">All Projects</h2>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p._id} className="border p-4 rounded-lg shadow-md">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-40 object-fit rounded-md mb-3"
              />
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{p.desc}</p>

              <div className="flex gap-3">
                {p.codelink && (
                  <a
                    href={p.codelink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Code
                  </a>
                )}
                {p.projectlink && (
                  <a
                    href={p.projectlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 underline"
                  >
                    Live
                  </a>
                )}
              </div>

              <button
                onClick={() => handleDelete(p._id)}
                className="mt-3 text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
