import { useEffect, useState, useMemo } from "react";
import { getRepositoryProjects } from "../../api/repository-projects.js";

export default function RepositoryTabs() {
  const [projects, setProjects] = useState([]);
  const [uniqueRepositories, setUniqueRepositories] = useState([]);
  const [selectedRepository, setSelectedRepository] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination state (optional, useful for many projects)
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getRepositoryProjects();
        console.log("response-data-projects", res);

        const mapped = res.data.data.map((p) => ({
          id: p.Id,
          repositoryName: p.Repository_Name,
          repoProjectName: p.Repository_Project_Name,
          deployUrl: p.Project_Deploy_Url,
          image: p.Project_Image,
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

  // ✅ Memoize filtered projects for performance
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => p.repositoryName === selectedRepository);
  }, [projects, selectedRepository]);

  // ✅ Pagination (slice projects)
  const paginatedProjects = useMemo(() => {
    return filteredProjects.slice(0, page * perPage);
  }, [filteredProjects, page]);

  if (loading)
    return (
      <p className="text-center py-20 text-gray-500 animate-pulse">
        Loading...
      </p>
    );

  if (error)
    return (
      <p className="text-center py-20 text-red-500 font-semibold">{error}</p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-6">
      {/* Left Tabs */}
      <div className="lg:w-1/4 mb-6 lg:mb-0">
        <h2 className="text-2xl font-bold mb-4">Repositories</h2>
        <div className="flex flex-col gap-3">
          {uniqueRepositories.map((name) => (
            <button
              key={name}
              onClick={() => {
                setSelectedRepository(name);
                setPage(1); // reset pagination on tab change
              }}
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
      <div className="lg:w-3/4 flex-1">
        <h2 className="text-2xl font-bold mb-6">
          {selectedRepository} Projects
        </h2>
        {paginatedProjects.length === 0 ? (
          <p className="text-gray-500">No projects found</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {paginatedProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 flex flex-col"
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.repoProjectName}
                    className="h-48 w-full object-cover"
                    loading="lazy" // ✅ lazy-load images
                  />
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {project.repoProjectName}
                  </h3>
                  <p className="text-gray-500 text-sm flex-1">
                    {project.repositoryName}
                  </p>
                  {project.deployUrl && (
                    <a
                      href={project.deployUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-500 text-center"
                    >
                      Live
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Button */}
        {paginatedProjects.length < filteredProjects.length && (
          <div className="text-center mt-6">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
