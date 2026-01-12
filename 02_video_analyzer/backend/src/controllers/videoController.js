import fs from "fs";
import extractFrames from "../utils/extractFrames.js";
import runOCR from "../utils/runOCR.js";
import cleanText from "../utils/cleanText.js";
import detectStack from "../utils/detectStack.js";
import generateScript from "../utils/generateScript.js";

export const uploadVideo = async (req, res) => {
  try {
    const videoPath = req.file.path;

    // 1️⃣ Extract frames
    await extractFrames(videoPath);

    // 2️⃣ Read frames
    const frames = fs.readdirSync("frames");
    if (!frames.length) {
      return res.status(400).json({ error: "No frames extracted" });
    }

    // 3️⃣ OCR first frame
    let combinedText = "";

    const framesToProcess = frames.slice(0, 5); // first 5 frames
    
    for (const frame of framesToProcess) {
      const frameText = await runOCR(`frames/${frame}`);
      combinedText += " " + frameText;
    }

    // 4️⃣ Clean OCR text
    const cleanedText = cleanText(combinedText);

    // 5️⃣ Detect tech stack
    const stack = detectStack(cleanedText);

    const script = await generateScript(stack, cleanedText);

    // 6️⃣ Response
    res.json({
      success: true,
      detectedStack: stack,
      narrationScript: script,
    });

  } catch (error) {
    console.error("Video processing error:", error);
    res.status(500).json({ error: "Video processing failed" });
  }
};
