import { useEffect, useState } from "react";
import { getRepositoryLists } from "../../api/repository-projects.js";

export default function RepositoryLists() {
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
        setError("Failed to load projects");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">Projects</h2>

      {projects.length === 0 ? (
        <p className="text-center text-gray-500">No projects found</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id} // ✅ unique key
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-56 w-full object-fit"
                />
              )}
              <div className="p-6 flex flex-col">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {project.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
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
