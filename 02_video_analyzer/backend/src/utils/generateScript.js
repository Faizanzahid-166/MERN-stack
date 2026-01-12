import { exec } from "child_process";

const generateScript = (stack, contextText) => {
  return new Promise((resolve, reject) => {
    const prompt = `
You are a professional YouTube coding instructor.

Generate a short English voice-over intro for a coding video.

Tech stack detected: ${stack.join(", ")}

Video context:
${contextText.slice(0, 800)}

Tone: clear, tutorial-style, confident.
Length: 2–3 sentences.
`;

    exec(
      `ollama run mistral "${prompt.replace(/"/g, '\\"')}"`,
      (error, stdout) => {
        if (error) reject(error);
        else resolve(stdout.trim());
      }
    );
  });
};

export default generateScript;
