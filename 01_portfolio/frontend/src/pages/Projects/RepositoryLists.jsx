import { useEffect, useState, useContext } from "react";
import { getRepositoryLists } from "../../api/repository-projects.js";
import ThemeContext from "../../context/themeContext.js";

export default function RepositoryLists() {
  const { darkMode } = useContext(ThemeContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getRepositoryLists();
        console.log("response-data-lists-repo", res);

        const mapped = res.data.data.map((p) => ({
          id: p.Id,
          name: p.Repository_Name,
          description: p.Repository_Description,
          uri: p.Repository_URI,
          image: p.Repository_Image,
        }));

        setProjects(mapped);
      } catch (err) {
        let message = "An unexpected error occurred";
        if (err.code === "ERR_NETWORK") {
          message = "Network Error: Please ensure the backend server is running on port 4000.";
        } else {
          message = err.response?.data?.message || err.message || "Failed to load projects";
        }
        setError(message);
        console.error("RepositoryLists Fetch Error:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading)
    return (
     <div className="flex justify-center items-center py-20">
  <div className="relative w-16 h-16 animate-spin">
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-sm"></div>
    <div className="absolute inset-2 rounded-full bg-black"></div>
  </div>
</div>

    );
  if (error)
    return (
      <p className="text-center py-20 text-red-500 font-semibold">{error}</p>
    );

  return (
    <div className={`max-w-7xl mx-auto px-4 py-12 transition-colors duration-300 ${darkMode ? "text-white" : "text-gray-900"}`}>
      <h2 className="text-3xl font-bold text-center mb-10">GitHub Repositories</h2>

      {projects.length === 0 ? (
        <p className="text-center text-gray-500">No projects found</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id} // ✅ unique key
              className={`rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ${darkMode ? "bg-gray-800" : "bg-white"}`}
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-56 w-full object-fit"
                />
              )}
              <div className="p-6 flex flex-col">
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
                  {project.name}
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {project.description}
                </p>
                {project.uri && (
                  <a
                    href={project.uri}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-500 text-center"
                  >
                    View Repo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
