import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import connectDB from "./database/connectDB.js";

import authRoutes from "./routes/auth.js";   // login/register
import chatRoutes from "./routes/chat.js";   // chat messages
import userRoutes from "./routes/users.js";  // get users

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);  // <-- FIXED

// Create HTTP server + socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173" }
});

const onlineUsers = new Map(); // userId -> socketId

io.on("connection", (socket) => {
    console.log(`🟢 Client connected: ${socket.id}`);
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });
  
  // user comes online
  socket.on("addUser", (userId) => {
       console.log("👤 User added:", userId);
    onlineUsers.set(userId, socket.id);
    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
  });

  socket.on("sendMessage", (data) => {
    socket.to(data.chatId).emit("receiveMessage", data);
  });

    // user disconnects
  socket.on("disconnect", () => {
    for (let [userId, socketId] of onlineUsers) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
        console.log(`🔴 User ${userId} disconnected`);
    }
    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
  });
});


server.listen(5000, () => {
  console.log("Server running on port 5000");
});
