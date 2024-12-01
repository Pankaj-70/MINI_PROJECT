import express from "express";
import { addOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.get("/getOrder/:id", getOrders);
router.post("/createOrder", addOrder);

export default router;
