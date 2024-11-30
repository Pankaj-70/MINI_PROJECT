import express from "express";
import {
  addItemToCart,
  getCart,
  updateItemQuantity,
  removeItemFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addItemToCart);
router.get("/getcart/:id", getCart);
router.patch("/update", updateItemQuantity);
router.delete("/remove", removeItemFromCart);

export default router;
