import express from "express";
import registerUser from "../controllers/auth/registerController.js";
import verifyUserEmail from "../controllers/auth/verifyEmailController.js";
import loginUser from "../controllers/auth/loginController.js";
import { apiLimiter } from "../middlewares/apiLimit.js";
import newAccessToken from "../controllers/auth/refreshTokenController.js";
import { resendVerifyEmailToken } from "../controllers/auth/resendVerifyEmailController.js";
import {
  resetPassword,
  resetPasswordRequest,
} from "../controllers/auth/passwordResetController.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:emailToken/:userId", verifyUserEmail);
router.post("/login", apiLimiter, loginUser);
router.get("/new_access_token", newAccessToken);
router.post("/resend_email_token", resendVerifyEmailToken);
router.post("/reset_password_request", resetPasswordRequest);
router.post("/reset_password", resetPassword);

export default router;
