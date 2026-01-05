import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

router.get("/:chatId", async (req, res) => {
  const messages = await Message.find({ chatId: req.params.chatId });
  res.json(messages);
});

export default router;
