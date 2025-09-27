// scripts/repos.js
import fs from "fs";
import fetch from "node-fetch";
import projectMeta from "../data/scriptProjects/projectMeta.js"; // 👈 import your meta

const username = "Faizanzahid-166";
const apiUrl = `https://api.github.com/users/${username}/repos`;

async function fetchRepos() {
  const res = await fetch(apiUrl);
  const data = await res.json();

  if (!Array.isArray(data)) {
    console.error("❌ GitHub API error:", data);
    return;
  }

  let reposList = data.map(repo => {
    // default values from GitHub
    let desc = repo.description || "No description";
    let img = repo.owner.avatar_url;

    // ✅ check projectMeta for overrides
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

  const content =
    "const repos = " +
    JSON.stringify(reposList, null, 2) +
    ";\n\nexport { repos };\n";

  fs.writeFileSync("./src/data/scriptProjects/repos.js", content, "utf8");
  console.log("✅ repos.js generated with", reposList.length, "repos");
}

fetchRepos().catch(console.error);
