import { useEffect, useState } from "react";
import { getRepositoryProjects } from "../../api/repository-projects.js";

export default function RepositoryTabs() {
  const [projects, setProjects] = useState([]);
  const [uniqueRepositories, setUniqueRepositories] = useState([]);
  const [selectedRepository, setSelectedRepository] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getRepositoryProjects();
        console.log("response-data",res)
        const mapped = res.data.data.map((p) => ({
          id: p["Id"],
          repositoryName: p["Repository-Name"],
          repoProjectName: p["Repository-Project-Name"],
          deployUrl: p["Project-Deploy-Url"],
          image: p["Project-Image"],
        }));

        setProjects(mapped);

        const uniqueNames = [...new Set(mapped.map((p) => p.repositoryName))];
        setUniqueRepositories(uniqueNames);

        if (uniqueNames.length) setSelectedRepository(uniqueNames[0]);
      } catch (err) {
        setError("Failed to load projects");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p className="text-center py-20 animate-pulse">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-20">{error}</p>;

  const filteredProjects = projects.filter(
    (p) => p.repositoryName === selectedRepository
  );

  return (
    <div className="max-w-10xl mx-auto px-3 py-10 flex gap-6">
      {/* Left Tabs */}
      <div className="w-1/4">
        <h2 className="text-2xl font-bold mb-4">Repositories</h2>
        <div className="flex flex-col gap-3">
          {uniqueRepositories.map((name) => (
            <button
              key={name}
              onClick={() => setSelectedRepository(name)}
              className={`px-4 py-2 text-left rounded-lg font-semibold transition ${
                selectedRepository === name
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Right Projects */}
      <div className="w-3/4">
        <h2 className="text-2xl font-bold mb-6">{selectedRepository} Projects</h2>
        {filteredProjects.length === 0 ? (
          <p className="text-gray-500">No projects found</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-md p-5 flex flex-col"
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.repoProjectName}
                    className="h-44 w-full object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{project.repoProjectName}</h3>
                <p className="text-gray-600 flex-1 text-sm">{project.repositoryName}</p>
                {project.deployUrl && (
                  <a
                    href={project.deployUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 mt-4 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-500"
                  >
                    Live
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
