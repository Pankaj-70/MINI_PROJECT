import { Router } from "express";
import { upload } from "../utils/cloudinary.js";
import {
  addNewProduct,
  deleteProduct,
  fetchAllProducts,
} from "../controllers/productController.js";

const router = Router();

router.post("/add", addNewProduct);
router.get("/fetch", fetchAllProducts);
router.delete("/delete/:id", deleteProduct);

export default router;
