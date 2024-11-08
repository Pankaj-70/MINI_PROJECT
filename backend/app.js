import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kB" }));
app.use(urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

import userRouter from "./routes/user.routes.js";
app.use("/api/v1/user", userRouter);

export { app };
