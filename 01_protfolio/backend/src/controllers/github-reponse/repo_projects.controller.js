// src/controllers/repo.controller.js
import { supabase } from "../../database/supabase/supabaseClient.js";
import { successResponse, errorResponse } from "../../lib/response.js";

// Get repository projects with optional filters
export async function getRepositoryProjects(req, res) {
  try {
    const { name, project_name, limit } = req.query; // query params

    // Start Supabase query
    let query = supabase
      .from("01_repository_projects")
      .select("*", { count: "exact" }) // get total count as well

    // Apply optional filters
    if (name) {
      query = query.ilike("name", `%${name}%`); // case-insensitive search
    }

    if (project_name) {
      query = query.ilike("project_name", `%${project_name}%`);
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Supabase fetch error:", error.message);
      return errorResponse(res, "Failed to fetch projects", 500);
    }

    return successResponse(res, "Projects fetched successfully", { data, count });
  } catch (err) {
    console.error("Controller error:", err.message);
    return errorResponse(res, "Server error", 500);
  }
}
