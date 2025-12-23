import express from "express";
import { getRepositoryProjects } from "../controllers/github-reponse/repo_projects.controller.js";

const router = express.Router();

router.get("/projects", getRepositoryProjects);

export default router;
