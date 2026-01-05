import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET all users (for chat list)
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "username _id"); // only send username and id
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "username _id");
    if (!user) return res.status(404).json("User not found");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
