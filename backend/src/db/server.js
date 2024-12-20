import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
  } catch (error) {
    console.log("Error in server.js");
    console.log(error);
    process.exit(1);
  }
};
export default connectDatabase;
