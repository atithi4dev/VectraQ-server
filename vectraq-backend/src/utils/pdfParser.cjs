let fs = require("fs");
let pdf = require("pdf-parse");

async function pdfParser(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    if(!dataBuffer) {
      return "No data found in the PDF file.";
    }
    const data = await pdf(dataBuffer);
     if (!data || !data.text) {
       return "No text extracted from the PDF file.";
     }
    return data.text || "No text extracted.";
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw error;
  }
}

module.exports = pdfParser;
