import express from "express";
import { getRepositoryProjects, getRepositoryLists } from "../controllers/github-reponse/repo_projects.controller.js";
import { createRepositoryProject, createRepositoryLists } from "../controllers/github-reponse/insert_project.controller.js";
const router = express.Router();

router.get("/projects", getRepositoryProjects);
router.get("/lists", getRepositoryLists);
router.post("/insert", createRepositoryProject);
router.post("/insert/lists", createRepositoryLists);
export default router;
