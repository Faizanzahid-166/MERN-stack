// scripts/projects.js
import fs from "fs";
import fetch from "node-fetch";
import projectMeta from "../data/scriptProjects/projectMeta.js"; // where your custom desc/img/deploy live
import { repos } from "../data/scriptProjects/repos.js"; // repos.js already generated

const username = "Faizanzahid-166";

async function fetchProjects() {
  let projects = [];

  for (const repo of repos) {
    const contentsUrl = `https://api.github.com/repos/${username}/${repo.title}/contents/`;
    const contentsRes = await fetch(contentsUrl);
    const contents = await contentsRes.json();

    if (Array.isArray(contents)) {
      for (const item of contents) {
        if (item.type === "dir") {
          let desc = `${item.name} project`;
          let img = repo.img;
          let deploy = `https://${username}.github.io/${repo.title}/${item.name}`;

          // ✅ Check meta for overrides
          if (projectMeta[repo.title]?.projects?.[item.name]) {
            const meta = projectMeta[repo.title].projects[item.name];
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
            category: repo.title,
          });
        }
      }
    }
  }

  const content =
    "const projects = " +
    JSON.stringify(projects, null, 2) +
    ";\n\nexport { projects };\n";

  fs.writeFileSync("./src/data/scriptProjects/repo_projects.js", content, "utf8");
  console.log("✅ repo_projects.js generated with", projects.length, "projects");
}

fetchProjects().catch(console.error);
