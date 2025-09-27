// // backend/src/controllers/repo.controller.js
// import projectMeta from "../data/projectMeta.js"; // 👈 adjust path
// import dotenv from "dotenv";

// dotenv.config();

// const username = "Faizanzahid-166";
// const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// // ✅ helper: fetch with GitHub token
// async function fetchWithToken(url) {
//   const res = await fetch(url, {
//     headers: GITHUB_TOKEN
//       ? { Authorization: `token ${GITHUB_TOKEN}` }
//       : {}, // fallback to unauthenticated
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(`GitHub API error: ${res.status} - ${text}`);
//   }

//   return res.json();
// }

// export async function getRepoProjects(req, res) {
//   try {
//     // ✅ fetch repos with token
//     const repos = await fetchWithToken(`https://api.github.com/users/${username}/repos`);

//     let projects = [];

//     for (const repo of repos) {
//       // ✅ fetch repo contents
//       const contents = await fetchWithToken(
//         `https://api.github.com/repos/${username}/${repo.name}/contents/`
//       );

//       if (Array.isArray(contents)) {
//         for (const item of contents) {
//           if (item.type === "dir") {
//             let desc = `${item.name} project`;
//             let img = repo.owner.avatar_url;
//             let deploy = `https://${username}.github.io/${repo.name}/${item.name}`;

//             // ✅ meta overrides
//             if (projectMeta[repo.name]?.projects?.[item.name]) {
//               const meta = projectMeta[repo.name].projects[item.name];
//               if (meta.desc) desc = meta.desc;
//               if (meta.img) img = meta.img;
//               if (meta.deploy) deploy = meta.deploy;
//             }

//             projects.push({
//               title: item.name,
//               desc,
//               img,
//               codelink: item.html_url,
//               projectlink: deploy,
//               category: repo.name,
//             });
//           }
//         }
//       }
//     }

//     res.json(projects);
//   } catch (err) {
//     console.error("❌ Error fetching projects:", err.message);
//     res.status(500).json({ error: "Failed to fetch projects", details: err.message });
//   }
// }


// backend/src/controllers/repo.controller.js
import projectMeta from "../data/projectMeta.js";
import RepoProject from "../models/repo.model.js";
import dotenv from "dotenv";

dotenv.config();

const username = "Faizanzahid-166";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function fetchWithToken(url) {
  const res = await fetch(url, {
    headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {},
  });
  if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
  return res.json();
}

// ✅ Sync from GitHub → Save to MongoDB
export async function syncRepoProjects(req, res) {
  try {
    const repos = await fetchWithToken(`https://api.github.com/users/${username}/repos`);
    let projects = [];

    for (const repo of repos) {
      const contents = await fetchWithToken(
        `https://api.github.com/repos/${username}/${repo.name}/contents/`
      );

      if (Array.isArray(contents)) {
        for (const item of contents) {
          if (item.type === "dir") {
            let desc = `${item.name} project`;
            let img = repo.owner.avatar_url;
            let deploy = `https://${username}.github.io/${repo.name}/${item.name}`;

            if (projectMeta[repo.name]?.projects?.[item.name]) {
              const meta = projectMeta[repo.name].projects[item.name];
              desc = meta.desc || desc;
              img = meta.img || img;
              deploy = meta.deploy || deploy;
            }

            projects.push({
              title: item.name,
              desc,
              img,
              codelink: item.html_url,
              projectlink: deploy,
              category: repo.name,
            });
          }
        }
      }
    }

    // 🗑 Clear old data and save fresh
    await RepoProject.deleteMany({});
    await RepoProject.insertMany(projects);

    res.json({ message: "✅ Synced and saved projects", count: projects.length });
  } catch (err) {
    console.error("❌ Sync error:", err);
    res.status(500).json({ error: "Failed to sync projects" });
  }
}

// ✅ Get from MongoDB
export async function getRepoProjects(req, res) {
  try {
    const projects = await RepoProject.find();
    res.json(projects);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch from DB" });
  }
}
