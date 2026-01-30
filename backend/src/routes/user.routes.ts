import {Router} from "express";
import {getMe, sendOTP, uploadAvatar, verifyOTPAndReset} from "../controllers/user.controller.ts";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.ts";
import {validateSchema} from "../middlewares/validate.middleware.ts";
import {resetPasswordSchema, sendOtpSchema} from "../validators/user.validator.ts";

const router = Router();

router.get("/getMe", authMiddleware, getMe);
router.post("/upload-avatar", authMiddleware, upload.single("avatar"), uploadAvatar);
router.post("/forgot-password/send-otp", validateSchema(sendOtpSchema), sendOTP);
router.post("/forgot-password/reset", validateSchema(resetPasswordSchema), verifyOTPAndReset);

export default router;
