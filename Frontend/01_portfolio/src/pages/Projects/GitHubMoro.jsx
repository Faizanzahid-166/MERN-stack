import { useEffect, useState } from "react";
import { fetchRepos, syncRepos } from "../../api/mororeposApi.js";
import { Link } from "react-router";

export default function GitHubMoro() {
  const [repos, setRepos] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(false); // ✅ new state
  const itemsPerPage = 8;

  useEffect(() => {
    loadRepos();
  }, []);

  const loadRepos = async () => {
    try {
      const data = await fetchRepos();
      setRepos(data);
    } catch (err) {
      console.error("❌ Failed to fetch repos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    if (!window.confirm("Sync repos from GitHub?")) return;
    setLoading(true);
    try {
      await syncRepos();
      await loadRepos();
    } catch (err) {
      console.error("❌ Sync failed:", err);
    }
  };

  // ✅ categories
  const categories = ["all", ...new Set(repos.map((r) => r.category))];

  // ✅ filter by category
  const filteredRepos =
    activeTab === "all"
      ? repos
      : repos.filter((r) => r.category === activeTab);

  // ✅ pagination
  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRepos = filteredRepos.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-10 text-center">
        <p className="text-lg font-medium animate-pulse">
          ⏳ Loading repos projects...
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">GitHub Projects 🚀</h2>
        <button
          onClick={handleSync}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow hover:from-blue-500 hover:to-purple-500"
        >
          🔄 Sync
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveTab(cat);
              setCurrentPage(1);
              setTabLoading(true);
              // fake timer to simulate "fetch"
              setTimeout(() => setTabLoading(false), 600);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition
              ${
                activeTab === cat
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading on tab change */}
      {tabLoading ? (
        <div className="text-center py-20">
          <p className="animate-pulse text-lg font-medium">
            🔄 Switching tab... please wait
          </p>
        </div>
      ) : (
        <>
          {/* Repo Cards */}
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
            {paginatedRepos.map((repo, i) => (
              <div
                key={i}
                className="w-full relative bg-gradient-to-tr from-blue-400 via-white to-blue-700
                       rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300
                       p-6 flex flex-col border border-gray-100
                       transform hover:scale-[1.02]"
              >
                <img
                  src={repo.img}
                  alt={repo.title}
                  className="w-full h-52 object-cover rounded-lg mb-5 shadow-md"
                />
                <h3 className="text-xl font-extrabold text-gray-800 mb-3">
                  {repo.title}
                </h3>
                <p className="text-gray-700 flex-1 leading-relaxed">
                  {repo.desc}
                </p>

                <div className="mt-6 flex gap-4">
                  <Link
                    to={repo.codelink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 shadow"
                  >
                    Code
                  </Link>
                  <Link
                    to={repo.projectlink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-500 hover:to-purple-500 shadow"
                  >
                    Live
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md border transition ${
                  currentPage === 1
                    ? "bg-white text-black cursor-not-allowed"
                    : " hover:bg-green-500 border-blue-500"
                }`}
              >
                Previous
              </button>

              <span className="text-gray-700 font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md border transition ${
                  currentPage === totalPages
                    ? "bg-white text-black cursor-not-allowed"
                    : " hover:bg-blue-800 border-green-500"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
