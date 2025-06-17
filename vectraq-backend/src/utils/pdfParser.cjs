const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
const Tesseract = require("tesseract.js");
const { fromPath } = require("pdf2pic");

const imagesPath = path.join(__dirname, "../public/temp/images");
if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath, { recursive: true });
}

async function extractedText(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const parsed = await pdf(dataBuffer);
    const totalPages = parsed.numpages || 1;

    let extractedText = parsed.text?.trim() || "";

    if (!extractedText) {
      const convert = fromPath(filePath, {
        density: 150,
        saveFilename: "ocr-temp",
        savePath: imagesPath,
        format: "png",
        width: 1200,
        height: 1600,
      });

      for (let i = 1; i <= totalPages; i++) {
        const result = await convert(i);
        const ocrResult = await Tesseract.recognize(result.path, "eng", {
          logger: (m) => console.log(m),
        });
        extractedText += "\n" + ocrResult.data.text;
      }
    }

    return extractedText;
  } catch (error) {
    console.error("❌ Error inside pdfParser:", error);
    throw error;
  }
}

module.exports = extractedText;
