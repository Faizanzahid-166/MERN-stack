// TTS using Google TTS API
// script/ai.js

// ai.js
import fs from "fs";
import gTTS from "google-tts-api";

/**
 * Generate TTS mp3 from text
 * @param {string} text
 * @param {string} outputPath
 */
async function generateTTS(text, outputPath) {
  const url = gTTS.getAudioUrl(text, {
    lang: "en",
    slow: false,
    host: "https://translate.google.com",
  });

  // download mp3 file
  const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));
  const response = await fetch(url);
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
}

export default generateTTS
