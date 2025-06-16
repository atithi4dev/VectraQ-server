import express from "express";
import cors from "cors";
import morganMiddleware from "./logger/indexLog.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();
app.use(morganMiddleware());
// app.use(
//      cors({
//           origin : process.env.CORS_ORIGIN || "*",
//           credentials: true,
//      })
// );


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookeParser());
app.use(express.static("public"));

// Import Routes

// Use Routes


app.use(errorHandler)

export { app };