import express from "express";
import {
  addOrder,
  getAllOrders,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/getOrder/:id", getOrders);
router.get("/getAllOrders", getAllOrders);
router.post("/createOrder", addOrder);
router.patch("/updateOrderStatus/:id", updateOrderStatus);
export default router;
