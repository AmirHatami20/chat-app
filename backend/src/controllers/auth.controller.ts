import bcrypt from "bcryptjs";
import jwt, {type JwtPayload} from "jsonwebtoken";
import {UserModel} from "../models/user.model";
import type {Request, Response} from "express";
import type {LoginType, RegisterType} from "../validators/auth.validator.ts";
import {generateAccessToken, generateRefreshToken} from "../utils/jwt.ts";

export const register = async (req: Request, res: Response) => {
    try {
        const body: RegisterType = req.body;

        const existingUser = await UserModel.findOne({email: body.email});
        if (existingUser) return res.status(400).json({message: "Email already in use"});

        const hashedPassword = await bcrypt.hash(body.password, 10);

        await UserModel.create({...body, password: hashedPassword});

        res.status(201).json({message: "User created"});
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "global error";
        res.status(500).json({message});
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const body: LoginType = req.body;

        const user = await UserModel.findOne({email: body.email});
        if (!user) return res.status(400).json({message: "Invalid credentials"});

        const isMatch = await bcrypt.compare(body.password, user.password!);
        if (!isMatch) return res.status(400).json({message: "Invalid credentials"});

        const accessToken = generateAccessToken(user._id.toString());
        const refreshToken = generateRefreshToken(user._id.toString());

        user.refreshToken = await bcrypt.hash(refreshToken, 10);
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/api/auth/refresh",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({accessToken});
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "global error";
        res.status(500).json({message});
    }
};

export const refresh = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;

        const user = await UserModel.findById(decoded.id).select("+refreshToken");
        if (!user || !user.refreshToken) return res.sendStatus(403);

        const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isValid) return res.sendStatus(403);

        const accessToken = generateAccessToken(user._id.toString());

        res.status(200).json({accessToken});
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "global error";
        res.status(500).json({message});
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.sendStatus(401);

        const user = await UserModel.findById(userId);
        if (!user) return res.sendStatus(404);

        user.refreshToken = "";
        await user.save();

        res.clearCookie("refreshToken", {
            path: "/api/auth/refresh",
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({message: "Logged out successfully"});
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "global error";
        res.status(500).json({message});
    }
};
