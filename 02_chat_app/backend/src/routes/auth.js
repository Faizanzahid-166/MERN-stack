import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ✅ REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashed });
  res.json({ message: "Registered", userId: user._id });
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json("User not found");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json("Wrong password");

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ userId: user._id, username: user.username, token });
});

export default router;
