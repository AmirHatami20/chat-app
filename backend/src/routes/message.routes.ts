import {Router} from "express";
import {sendMessage, getMessages, getAdminChats} from "../controllers/message.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.post("/send", authMiddleware, sendMessage);
router.get("/:userId", authMiddleware, getMessages);
router.get("/chats", authMiddleware, getAdminChats);

export default router;
