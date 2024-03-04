import express from "express";
import { HandleUserRegister, getAllUsers, handleForgotPassword, handleLoginUser, handleResendOtp, handleResetPassword, handleVerifyOtp } from "../controllers/UserController.js";

const router = express.Router();

// Post Requests
router.post("/register", HandleUserRegister);
router.post("/login", handleLoginUser);
router.post("/otp-verify", handleVerifyOtp);

// Patch Requests
router.patch("/forgot-password", handleForgotPassword);
router.patch("/reset-password", handleResetPassword);
router.patch("/resend-otp", handleResendOtp);


router.get("/all-users", getAllUsers);

export default router;