import { Product } from "../models/productSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { imageUploadUtil } from "../utils/cloudinary.js";
import mongoose from "mongoose";

const addNewProduct = asyncHandler(async (req, res) => {
  const { img: image, name, stock, price, description, category } = req.body;

  let img = null;

  if (req.file) {
    img = await imageUploadUtil(req.file);
  }
  const newlyCreatedProduct = new Product({
    name,
    price,
    img,
    stock,
    description,
    category,
  });

  await newlyCreatedProduct.save();
  res.status(200).json({
    success: true,
    data: newlyCreatedProduct,
  });
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  const listOfProducts = await Product.find({});
  res.status(200).json({
    success: true,
    data: listOfProducts,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params;
  const objectId = new mongoose.Types.ObjectId(id);
  const productToDelete = await Product.findByIdAndDelete(objectId);
  if (!productToDelete) {
    return res.status(400).json({
      success: false,
      message: "Product not found",
      id,
    });
  }
  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    id,
  });
});

export { addNewProduct, fetchAllProducts, deleteProduct };
