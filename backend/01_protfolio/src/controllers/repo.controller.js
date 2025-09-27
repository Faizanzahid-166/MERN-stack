import projectMeta from "../data/projectMeta.js";

const username = "Faizanzahid-166";
const apiUrl = `https://api.github.com/users/${username}/repos`;

// ✅ Load token from env (store in .env)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export const getRepos = async (req, res) => {
  try {
    const response = await fetch(apiUrl, {
      headers: GITHUB_TOKEN
        ? { Authorization: `token ${GITHUB_TOKEN}` } // ✅ authenticated request
        : {}, // fallback to unauthenticated (60/hr limit)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res
        .status(response.status)
        .json({ error: "❌ GitHub API error", details: errorText });
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return res
        .status(500)
        .json({ error: "❌ Unexpected GitHub response", details: data });
    }

    const reposList = data.map((repo) => {
      let desc = repo.description || "No description";
      let img = repo.owner.avatar_url;

      // ✅ Apply projectMeta overrides if defined
      if (projectMeta[repo.name]?.__repo) {
        const meta = projectMeta[repo.name].__repo;
        if (meta.desc) desc = meta.desc;
        if (meta.img) img = meta.img;
      }

      return {
        title: repo.name,
        desc,
        img,
        codelink: repo.html_url,
        category: repo.name,
      };
    });

    res.json(reposList);
  } catch (err) {
    console.error("❌ Error fetching repos:", err);
    res.status(500).json({ error: "Failed to fetch repos" });
  }
};
