import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { uploadImage } from "../api/imageApi";

const DropZone = () => {
  const [files, setFiles] = useState([]);
  const [extractedText, setExtractedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    const mappedFiles = acceptedFiles.map((file) => {
      return Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
    });
    setFiles(mappedFiles);
  }, []);

  // Set up dropzone with accepted file types and max files
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf/*": [] },
    maxFiles: 1,
  });

  // Clean up previews when component unmounts
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);


  // Handle file upload and text extraction
  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please upload an image file first.");
      return;
    }

    try {
      const data = await uploadImage(files[0]);
      toast.success("File uploaded successfully. Processing...");
      setExtractedText(data.data.text || "No text extracted.");
    } catch (error) {
      toast.error("Upload failed.");
    }
  };

  // Handle button effect for processing state
  const handleButtonEffect = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  // Handle click event for upload button
  const handleClick = () => {
    handleUpload();
    handleButtonEffect();
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-3xl mx-auto px-4 py-16 bg-white shadow-md rounded-lg">
      <div
        {...getRootProps()}
        className="w-full border-dashed border-2 border-gray-400 px-6 py-16  text-center rounded-md cursor-pointer hover:bg-gray-100 transition"
      >
        <input {...getInputProps()} />
        <p className="text-gray-600 text-sm sm:text-base">
          {isDragActive
            ? "Drop the file here..."
            : "Drag & drop an image here, or click to select"}
        </p>
      </div>

      {/* File name */}
      {files.length > 0 && (
        <p className="text-gray-700 text-sm sm:text-base font-medium text-center">
          Selected: <span className="text-blue-600">{files[0].name}</span>
        </p>
      )}

      {/* Previews */}
      <div className="flex gap-4 flex-wrap justify-center">
        {files.map((file, i) => (
          <div
            key={i}
            className="w-full sm:w-60 h-60 overflow-hidden rounded-md shadow"
          >
            <img
              src="image.png"
              alt="preview"
              className="object-contain w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <button
        onClick={handleClick}
        disabled={isProcessing}
        className={` ${
          isProcessing
            ? "bg-red-600 text-white"
            : "bg-black text-white hover:bg-gray-800"
        } px-6 py-2 rounded-md hover:opacity-90 transition text-sm sm:text-base font-semibold`}
      >
        {isProcessing ? "Processing..." : "Upload and Extract"}
      </button>

      {/* Extracted Text Display */}
      {extractedText && (
        <div className="w-full mt-4 bg-gray-100 p-4 rounded-md shadow">
          <h3 className="font-semibold text-sm sm:text-base mb-2">
            Summary Text:
          </h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-700">
            {extractedText}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DropZone;
