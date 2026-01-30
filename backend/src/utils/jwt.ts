import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string) =>
    jwt.sign({id: userId}, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: "1m"});

export const generateRefreshToken = (userId: string) =>
    jwt.sign({id: userId}, process.env.REFRESH_TOKEN_SECRET as string, {expiresIn: "7d"});
