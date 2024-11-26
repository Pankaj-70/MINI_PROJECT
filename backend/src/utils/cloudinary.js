import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file.path, {
    resource_type: "auto",
  });
  return result.secure_url;
}
export { imageUploadUtil };
