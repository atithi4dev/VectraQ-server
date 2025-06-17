import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const uploadPdf = asyncHandler(async (req, res) => {
  const file = req.file;
  if (!file) {
    throw new ApiError(400, "No file uploaded");
  }
 
  if (file.mimetype !== "application/pdf") {
    throw new ApiError(400, "Invalid file type. Only PDF files are allowed.");
  }
  
  const { default: pdfParser } = await import("../utils/pdfParser.cjs");
  if (!pdfParser) {
    throw new ApiError(500, "PDF parser module not found");
  }
  
  const extractedText = await pdfParser(file.path);
  if (!extractedText) {
    throw new ApiError(500, "No text extracted from the PDF file.");
  }
  if (extractedText.length === 0) {
    throw new ApiError(500, "No text extracted from the PDF file.");
  }
 
  res.status(200).json(
    new ApiResponse(
      200,
      {
        text: extractedText,
      },
      "PDF Upload Success"
    )
  );
});

export { uploadPdf };
