import {Server, Socket} from "socket.io";
import jwt, {type JwtPayload} from "jsonwebtoken";
import {UserModel} from "../models/user.model";

export const chatSocket = (io: Server) => {
    io.on("connection", async (socket: Socket) => {
        try {
            const token = socket.handshake.auth.token;
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;

            const user = await UserModel.findById(decoded.id);
            if (!user) return socket.disconnect();

            socket.join(user._id.toString());

            user.isOnline = true;
            await user.save();

            console.log("User connected:", user.username);

            socket.on("disconnect", async () => {
                user.isOnline = false;
                user.lastSeen = new Date();
                await user.save();
                console.log("User disconnected:", user.username);
            });

        } catch {
            socket.disconnect();
        }
    });
};
