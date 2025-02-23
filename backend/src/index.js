import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.route.js";
import fileRoutes from "./routes/file.route.js";
import chatRoutes from "./routes/chatRoutes.js"; 
import { connectDB } from "./lib/db.js";
import ChatUser from "./models/chatUser.model.js"; // Import User model
import { protectRoute } from "./middleware/auth.middleware.js";

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/chat", chatRoutes);

// Fetch all users (needed for Chat)
app.get("/api/users",protectRoute ,async (req, res) => {
  console.log("Received request at /api/users");

  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const loggedInUsername = req.user.fullName; // Get the logged-in user's full name

    // Fetch users excluding the currently logged-in user
    const usersdetail = await ChatUser.find(
      { username: { $ne: loggedInUsername } }, // Exclude the logged-in user
      { _id: 1, username: 1, online: 1 } // Select only relevant fields
    );

    console.log("Fetched users from DB:", usersdetail); // Debugging log

    if (!usersdetail.length) {
      console.log("No users found in database.");
      return res.status(200).json({ success: true, message: "No users found", users: [] });
    }

    res.status(200).json({ success: true, users: usersdetail });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});



// Socket.io Setup
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start Server
server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  connectDB();
});
