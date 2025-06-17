import express from "express";
import cors from "cors";
import morganMiddleware from "./logger/indexLog.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(morganMiddleware());
app.use(
     cors({
          origin : process.env.CORS_ORIGIN || "*",
          credentials: true,
     })
);


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser());
app.use(express.static("public"));

// Import Routes
import pdfRouter from "./routes/pdf.routes.js";
// Use Routes
app.use("/api/v1/pdf", pdfRouter);


app.use(errorHandler)

export { app };