import { useEffect, useState } from "react";
import { fetchRepos } from "../../api/reposApi.js";

export default function GitHubRepo() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        const data = await fetchRepos();
        setRepos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadRepos();
  }, []);

  if (loading) return <p className="text-center">⏳ Loading repos...</p>;

  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">📦 GitHub Repositories</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <div
            key={repo.title}
            className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition"
          >
            <img
              src={repo.img}
              alt={repo.title}
              className="w-full h-40 object-scale-down rounded-md"
            />
            <h3 className="text-lg font-semibold mt-3 text-black">{repo.title}</h3>
            <p className="text-sm text-black">{repo.desc}</p>
            <a
              href={repo.codelink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-blue-600 hover:underline"
            >
              View Code →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
