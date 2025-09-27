import fs from "fs";
import fetch from "node-fetch";
import projectMeta from "../data/projectMeta.js";

const username = "Faizanzahid-166";
const apiUrl = `https://api.github.com/users/${username}/repos`;

async function fetchRepos() {
  const res = await fetch(apiUrl);
  const data = await res.json();

  if (!Array.isArray(data)) {
    console.error("❌ GitHub API error:", data);
    return;
  }

  let projects = [];
  let reposList = [];

  for (const repo of data) {
    reposList.push({
      title: repo.name,
      desc: repo.description || "No description",
      img: repo.owner.avatar_url,
      codelink: repo.html_url,
      category: repo.name
    });

    const contentsUrl = `https://api.github.com/repos/${username}/${repo.name}/contents/`;
    const contentsRes = await fetch(contentsUrl);
    const contents = await contentsRes.json();

    if (Array.isArray(contents)) {
      for (const item of contents) {
        if (item.type === "dir") {
          let desc = `${item.name} project`;
          let img = repo.owner.avatar_url;
          let deploy = `https://${username}.github.io/${repo.name}/${item.name}`;

          // 🔑 Apply overrides from projectMeta
          if (projectMeta[repo.name]?.[item.name]) {
            const meta = projectMeta[repo.name][item.name];
            if (meta.desc) desc = meta.desc;
            if (meta.img) img = meta.img;
            if (meta.deploy) deploy = meta.deploy;
          }

          projects.push({
            title: item.name,
            desc,
            img,
            codelink: item.html_url,
            projectlink: deploy,
            category: repo.name
          });
        }
      }
    }
  }

  const content =
    "const projects = " +
    JSON.stringify(projects, null, 2) +
    ";\n\nconst repos = " +
    JSON.stringify(reposList, null, 2) +
    ";\n\nexport { projects, repos };\n";

  fs.writeFileSync("./src/data/projects_repo.js", content, "utf8");
  console.log("✅ projects.js generated with", projects.length, "projects and", reposList.length, "repos");
}

fetchRepos().catch(console.error);
