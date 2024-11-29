import { Router } from "express";
import { sendMail } from "../controllers/sendMailController.js";

const router = Router();

router.post("/contact", sendMail);

export default router;
