import http from "http";
import {Server} from "socket.io";
import connectDB from "./config/db";
import app from "./app";
import {chatSocket} from "./sockets/chat.socket";

const main = async () => {
    await connectDB();

    const httpServer = http.createServer(app);

    const io = new Server(httpServer, {
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        },
    });

    app.set("io", io);

    chatSocket(io);

    const PORT = process.env.PORT || 5000;

    httpServer.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
};

main();
