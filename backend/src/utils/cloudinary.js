import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.memoryStorage();

async function imageUploadUtil(file) {
  console.log("image util");
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result.secure_url;
}

const upload = multer({ storage });

export { upload, imageUploadUtil };
