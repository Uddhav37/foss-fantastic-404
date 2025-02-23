
import express from "express";

import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import cors from "cors"


import authRoutes from "./routes/auth.route.js";
import fileRoutes from "./routes/file.route.js";
import { connectDB } from "./lib/db.js";



dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173", // Corrected the port separator
    credentials: true, // Corrected property name (lowercase 'c')
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/auth", fileRoutes);

app.listen(PORT,()=>{ 
  console.log("Server is running on port:-"+PORT);
  connectDB();
  
})