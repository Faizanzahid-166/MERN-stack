import express from "express";
import multer from "multer";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import cors from "cors";
import fs  from "fs";
import  path from "path";
import  generateTTS  from "./script/ai.js";

const server = express();
ffmpeg.setFfmpegPath(ffmpegPath);
server.use(cors());
server.use(express.json());

const upload = multer({ dest: "uploads/" });

// Endpoint to upload video
server.post("/api/upload", upload.single("video"), async (req, res) => {
  try {
    const videoPath = req.file.path;
    const { script } = req.body; // text you want AI voice to read

    if (!script) return res.status(400).json({ error: "Please provide a script!" });

    // 1️⃣ Generate AI voice
    const ttsPath = `uploads/${Date.now()}_voice.mp3`;
    await generateTTS(script, ttsPath);

    // 2️⃣ Merge voice + optional music into video
    const outputPath = `processed/${Date.now()}_video.mp4`;

    // If you want background music, place it in backend folder
    const bgMusicPath = "background_music.mp3"; // optional

    const command = ffmpeg(videoPath)
      .input(ttsPath);

    if (fs.existsSync(bgMusicPath)) {
      command.input(bgMusicPath);
      command.complexFilter([
        "[1:a][2:a]amix=inputs=2:duration=shortest[a]"
      ]).outputOptions(["-map 0:v", "-map [a]"]);
    } else {
      command.outputOptions(["-map 0:v", "-map 1:a"]);
    }

    command
      .on("end", () => {
        // cleanup temp files
        fs.unlinkSync(videoPath);
        fs.unlinkSync(ttsPath);
        res.json({ url: `/${outputPath}` });
      })
      .on("error", (err) => {
        console.error(err);
        res.status(500).json({ error: "Video processing failed" });
      })
      .save(outputPath);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

server.use("/processed", express.static("processed"));

export {server};