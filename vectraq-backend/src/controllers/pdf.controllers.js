import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const uploadPDFAndExtractText = asyncHandler(async (req, res) => {
  const file = req.file;
  if (!file) {
    throw new ApiError(400, "No file uploaded. Please upload a PDF file.");
  }
  if (file.mimetype !== "application/pdf") {
    throw new ApiError(400, "Invalid file type. Please upload a PDF file.");
  }

  try {
    const { default: extractTextWithOCR } = await import(
      "../utils/pdfParser.cjs"
    );

    const extractedText = await extractTextWithOCR(file.path);
    if(!extractedText) {
      throw new ApiError(500, "Failed to extract text from PDF.");
    }

    res.status(200).json(
      new ApiResponse(
        200,
        {
          text: extractedText,
          fileName: file.filename,
          fileSize: file.size,
          fileType: file.mimetype,
          uploadDate: new Date().toISOString(),
          pageCount: file.numpages || 1,
        },
        "PDF Upload Success"
      )
    );
  } catch (err) {
    console.error("❌ Error in controller:", err);
    throw new ApiError(500, "Failed to extract text from PDF.");
  }
});

export { uploadPDFAndExtractText };
