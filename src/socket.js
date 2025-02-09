import { io } from "socket.io-client";

export const initSocket = async () => {
    const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    console.log("Connecting to WebSocket at:", backendURL);

    const socket = io(backendURL, {
        forceNew: true,
        reconnectionAttempts: Infinity,
        timeout: 10000,
        transports: ["websocket"],
    });

    socket.on("connect", () => console.log("🔗 Connected to WebSocket"));
    socket.on("connect_error", (err) => console.error("❌ WebSocket Error:", err));

    return socket;
};
