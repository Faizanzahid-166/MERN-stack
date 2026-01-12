import Tesseract from "tesseract.js";

const runOCR = async (imagePath) => {
  const result = await Tesseract.recognize(imagePath, "eng");
  return result.data.text;
};

export default runOCR;
