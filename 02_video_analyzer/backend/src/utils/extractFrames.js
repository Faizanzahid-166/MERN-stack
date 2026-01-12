import { exec } from "child_process";
import fs from "fs";
import path from "path";

const extractFrames = (videoPath) => {
  return new Promise((resolve, reject) => {
    const framesDir = path.join(process.cwd(), "frames");

    // ✅ Ensure frames folder exists
    if (!fs.existsSync(framesDir)) {
      fs.mkdirSync(framesDir);
    }

    const command = `ffmpeg -i "${videoPath}" -vf fps=1/3 "${framesDir}/frame_%03d.png"`;

    exec(command, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
};

export default extractFrames;
