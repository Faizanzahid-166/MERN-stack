import express from "express";
import { uploadVideo } from "../controllers/videoController.js";
import upload from '../middleware/multer.js'

const router = express.Router();
router.post("/upload", upload.single("video"), uploadVideo);

export default router;
