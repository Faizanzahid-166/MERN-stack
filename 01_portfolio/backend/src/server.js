import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser'



const server = express();

// 🔑 split env string into array
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];


server.use(cors({
    origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl) or matching origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
    credentials: true,
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     allowedHeaders: ['Content-Type', 'Authorization'],
}))
server.use(express.json({limit:"16kb"}))
server.use(express.urlencoded({extended:true, limit:"16kb"}))
server.use(express.static("public"))
server.use(cookieParser())

import contactRoutes from "./routes/contact.routes.js";
import authRoutes from "./routes/auth.routes.js";
import repo_projects from './routes/repo_projects.routes.js'

// ✅ Routes

server.use("/api/auth", authRoutes);
server.use("/api/repository", repo_projects);
server.use("/api/contact", contactRoutes);
export {server};