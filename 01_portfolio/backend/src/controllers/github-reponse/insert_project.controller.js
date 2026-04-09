import { supabase } from "../../database/supabase/supabaseClient.js";
import { successResponse, errorResponse } from "../../lib/response.js";
// import { v4 as uuidv4 } from "uuid"; // npm install uuid

export async function createRepositoryProject(req, res) {
  try {
    const {
      //Id,
      Repository_Name,
      Repository_Project_Name,
      Project_Deploy_Url,
      Project_Image,
      Project_Description,
    } = req.body;

    // Validation
    if (!Repository_Name || !Repository_Project_Name) {
      return errorResponse(
        res,
        "Repository_Name and Repository_Project_Name are required",
        400
      );
    }

    // Initialize Id
    //const Id = uuidv4();

    const { data, error } = await supabase
      .from("01_repository_projects")
      .insert([
        {
         // Id, // include explicitly
          Repository_Name,
          Repository_Project_Name,
          Project_Deploy_Url,
          Project_Image,
          Project_Description,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error.message);
      return errorResponse(res, "Failed to insert project", 500);
    }

    return successResponse(res, "Project inserted successfully", data[0]);
  } catch (err) {
    console.error("Controller error:", err.message);
    return errorResponse(res, "Server error", 500);
  }
}


export async function createRepositoryLists(req, res) {
  try {
    const {
      Repository_Name,
      Repository_Description,
      Repository_URI,
      Repository_Image,
    } = req.body;

    // ✅ Correct validation
    if (!Repository_Name || !Repository_Description) {
      return errorResponse(
        res,
        "Repository_Name and Repository_Description are required",
        400
      );
    }

    const { data, error } = await supabase
      .from("02_repository_description")
      .insert([
        {
          Repository_Name,
          Repository_Description,
          Repository_URI,
          Repository_Image,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error.message);
      return errorResponse(res, "Failed to insert repository", 500);
    }

    return successResponse(res, "Repository inserted successfully", data[0]);
  } catch (err) {
    console.error("Controller error:", err.message);
    return errorResponse(res, "Server error", 500);
  }
}
