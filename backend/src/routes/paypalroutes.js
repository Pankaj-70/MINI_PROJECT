import express from "express";
import {
  createPayment,
  creditCardPayment,
} from "../controllers/paypalController.js";

const router = express.Router();

router.post("/create-payment", createPayment);
router.post("/credit-card-payment", creditCardPayment);
export default router;
