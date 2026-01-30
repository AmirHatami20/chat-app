import jwt, {type JwtPayload} from "jsonwebtoken";
import type {Request, Response, NextFunction} from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.sendStatus(401);

        const token = authHeader.split(" ")[1];
        if (!token) return res.sendStatus(401);

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
        req.user = {id: decoded.id};
        next();
    } catch (err) {
        return res.sendStatus(403);
    }
};
