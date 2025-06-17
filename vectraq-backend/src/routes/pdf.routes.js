import { Router } from "express";
import { uploadPdf } from "../controllers/pdf.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/upload").post(upload.single("file"), uploadPdf);

export default router;
