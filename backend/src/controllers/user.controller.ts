import type {Request, Response} from "express";
import {UserModel} from "../models/user.model.ts";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import type {ResetPasswordType, SendOtpType} from "../validators/user.validator.ts";

export const getMe = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.sendStatus(401);

        const user = await UserModel.findById(userId).select(
            "username email avatar role isOnline lastSeen"
        );
        if (!user) return res.sendStatus(404);

        res.status(200).json({user});
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "global error";
        res.status(500).json({message});
    }
};

export const uploadAvatar = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.sendStatus(401);

        if (!req.file) return res.status(400).json({message: "No file uploaded"});

        const user = await UserModel.findById(userId);
        if (!user) return res.sendStatus(404);

        // Delete old avatar
        if (user.avatar) {
            const oldPath = path.join(process.cwd(), "uploads/avatars", user.avatar);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        user.avatar = req.file.filename;
        await user.save();

        res.status(200).json({message: "Avatar updated successfully", avatar: user.avatar});
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "global error";
        res.status(500).json({message});
    }
};

export const sendOTP = async (req: Request, res: Response) => {
    try {
        const body: SendOtpType = req.body;

        const user = await UserModel.findOne({email: body.email});
        if (!user) return res.status(404).json({message: "User not found"});

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes

        user.resetOTP = otp;
        user.resetOTPExpires = otpExpiry;
        await user.save();

        // await transporter.sendMail({
        //     from: process.env.SMTP_FROM,
        //     to: user.email,
        //     subject: "Your OTP for password reset",
        //     text: `Your OTP is ${otp}. It will expire in 2 minutes.`,
        // });

        res.status(200).json({message: `OTP sent to ${body.email} and is ${otp}`});
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "global error";
        res.status(500).json({message});
    }
};

export const verifyOTPAndReset = async (req: Request, res: Response) => {
    try {
        const body: ResetPasswordType = req.body;

        const user = await UserModel.findOne({email: body.email}).select("+resetOTP +resetOTPExpires");
        if (!user) return res.status(404).json({message: "User not found"});

        if (user.resetOTP !== body.otp || !user.resetOTPExpires || user.resetOTPExpires < new Date()) {
            return res.status(400).json({message: "Invalid or expired OTP"});
        }

        user.password = await bcrypt.hash(body.password, 10);
        user.resetOTP = undefined;
        user.resetOTPExpires = undefined;

        await user.save();

        res.status(200).json({message: "Password reset successfully"});
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "global error";
        res.status(500).json({message});
    }
};

