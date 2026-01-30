import type {Request, Response} from "express";
import {MessageModel} from "../models/message.model";
import type {MessageType} from "../validators/message.validator.ts";
import {UserModel} from "../models/user.model.ts";

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const senderId = req.user?.id;
        const body: MessageType = req.body;

        const message = await MessageModel.create({
            sender: senderId,
            receiver: body.receiverId,
            text: body.text
        });

        req.app.get("io").to(body.receiverId).emit("receive_message", message);
        req.app.get("io").to(senderId!).emit("receive_message", message);

        res.json(message);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "error";
        res.status(500).json({message});
    }
};

export const getMessages = async (req: Request, res: Response) => {
    try {
        const myId = req.user?.id;
        const otherId = req.params.userId;

        const messages = await MessageModel.find({
            $or: [
                {sender: myId, receiver: otherId},
                {sender: otherId, receiver: myId}
            ]
        }).sort({createdAt: 1});

        res.json(messages);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "error";
        res.status(500).json({message});
    }
};

export const getAdminChats = async (req: Request, res: Response) => {
    try {
        const adminId = req.user?.id;
        if (!adminId) return res.sendStatus(401);

        const admin = await UserModel.findById(adminId).select("role");
        if (!admin || admin.role !== "admin") {
            return res.status(403).json({message: "Access denied"});
        }

        const messages = await MessageModel.find({
            $or: [{sender: adminId}, {receiver: adminId}]
        }).select("sender receiver");

        const userIds = new Set<string>();

        messages.forEach(msg => {
            if (msg.sender.toString() !== adminId) userIds.add(msg.sender.toString());
            if (msg.receiver.toString() !== adminId) userIds.add(msg.receiver.toString());
        });

        const users = await UserModel.find({_id: {$in: [...userIds]}}).select(
            "username avatar isOnline lastSeen"
        );

        res.json(users);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "error";
        res.status(500).json({message});
    }
};