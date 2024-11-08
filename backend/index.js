import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./db/server.js";
import { app } from "./app.js";
dotenv.config({
  path: "./env",
});
connectDatabase()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server started at: ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Error in index.js: ");
    console.log(error);
  });
