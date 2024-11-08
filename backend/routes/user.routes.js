import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getLoginUser,
} from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/getuser").get(verifyJWT,getLoginUser);

export default router;
