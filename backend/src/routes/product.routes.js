import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addNewProduct,
  deleteProduct,
  fetchAllProducts,
} from "../controllers/productController.js";

const router = Router();

router.post("/add", upload.single("img"), addNewProduct);
router.get("/fetch", fetchAllProducts);
router.delete("/delete/:id", deleteProduct);

export default router;
