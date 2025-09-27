// mororepos.routes.js
import { Router } from "express";
import { getRepoProjects, syncRepoProjects } from "../controllers/mororepo.controller.js";

const router = Router();

router.get("/", getRepoProjects);  // <-- root instead of /repo-projects
router.post("/sync", syncRepoProjects); // sync GitHub → DB
export default router;
