import express from "express";
import {
  addOrder,
  deleteOrder,
  getAllOrders,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/getOrder/:id", getOrders);
router.get("/getAllOrders", getAllOrders);
router.post("/createOrder", addOrder);
router.patch("/updateOrderStatus/:id", updateOrderStatus);
router.patch("/deleteOrder/:id", deleteOrder);
export default router;
