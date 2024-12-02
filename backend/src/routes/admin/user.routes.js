import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getLoginUser,
} from "../../controllers/admin/restController.js";
import { verifyJWT } from "../../middlewares/admin/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/getuser").get(getLoginUser);

export default router;
