import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/", createProject);      // Add project
router.get("/", getProjects);         // Get all projects
router.get("/:id", getProjectById);   // Get single project
router.put("/:id", updateProject);    // Update project
router.delete("/:id", deleteProject); // Delete project

export default router;
