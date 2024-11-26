import { Product } from "../models/productSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { imageUploadUtil } from "../utils/cloudinary.js";

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
  const productToDelete = await Product.findByIdAndDelete(id);
  if (!productToDelete) {
    return res.status(400).json({
      success: false,
      message: "Product not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

export { addNewProduct, fetchAllProducts, deleteProduct };
